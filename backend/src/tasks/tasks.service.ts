import { Inject, Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from '~entities/tasks.entity';
import { configService } from '../config/config.service';
import { DownloadService } from '../downloads/download.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  @Inject(DownloadService)
  private readonly downloadService: DownloadService;
  private readonly watchdogTimeout: number;
  constructor(
    @InjectRepository(Tasks)
    private tasksRepository: Repository<Tasks>,
  ) {
    this.watchdogTimeout = configService.getWatchdogTimeout();
  }

  @Interval(2000)
  async handleTasks() {
    const inProgressCount = await this.tasksRepository.count({
      relations: { taskStatus: true, downloadResource: true },
      where: { taskStatus: { name: 'IN_PROGRESS' } },
    });

    if (inProgressCount >= 5) {
      return;
    }

    const idleTask = await this.tasksRepository.findOne({
      relations: { taskStatus: true, downloadResource: true },
      where: { taskStatus: { name: 'IDLE' } },
    });

    if (!idleTask) {
      return;
    }

    await this.tasksRepository.update({ id: idleTask.id }, { taskStatusId: 2 });
    this.logger.log(`Start downloading ${idleTask.url} to ${idleTask.path}`);

    const onInit = async (size: number): Promise<void> => {
      await this.tasksRepository.update({ id: idleTask.id }, { size, started: new Date().getTime() });
    };

    const onProgress = async (downloaded: number, percentage: number): Promise<void> => {
      if (percentage === 100) {
        await this.tasksRepository.update(
          { id: idleTask.id },
          { downloaded, taskStatusId: 3, finished: new Date().getTime() },
        );
        this.logger.log(`Finished downloading ${idleTask.path}`);
      } else {
        await this.tasksRepository.update({ id: idleTask.id }, { downloaded });
      }
    };

    this.downloadService.handleTask(idleTask, { onInit, onProgress });
  }

  @Interval(30000)
  async watchDog() {
    const currentTimestamp = new Date().getTime();

    const result = await this.tasksRepository
      .createQueryBuilder()
      .update(Tasks)
      .set({ taskStatusId: 1 })
      .where('task_status_id = :id', { id: 2 })
      .andWhere(`started < ${currentTimestamp} - ${this.watchdogTimeout}`)
      .execute();

    if (result?.affected) {
      this.logger.warn(`Found ${result.affected} records to restart downloading`);
    }
  }

  async getAllTasks() {
    return await this.tasksRepository.find({
      relations: { taskStatus: true, downloadResource: true },
      order: { taskStatusId: 'ASC' },
    });
  }
}
