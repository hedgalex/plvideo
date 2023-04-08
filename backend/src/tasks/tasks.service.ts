import { Inject, Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from '~server/entities/tasks';
import { configService } from '../config/config.service';
import { DownloadService } from '../downloads/download.service';
import { EResource, EShowTypes, ETaskStatus } from '~shared/.consts';
import { IDownload, IPageListResult, ITask } from '../shared/.ifaces';
import { Episodes } from '../entities/episodes';
import { getMovieFilePath, getTVShowFilePath } from '../utils/paths';

const ORORO_URL = 'https://ororo.tv/en';
const AC_URL = 'https://z.animecult.org/serial/';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  @Inject(DownloadService)
  private readonly downloadService: DownloadService;
  private readonly watchdogTimeout: number;
  constructor(
    @InjectRepository(Tasks)
    private tasksRepository: Repository<Tasks>,
    @InjectRepository(Episodes)
    private episodesRepository: Repository<Episodes>,
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

    await this.tasksRepository.update({ id: idleTask.id }, { taskStatusId: 2, error: '', errorTime: 0 });
    this.logger.log(`Start downloading ${idleTask.url} to ${idleTask.path}`);

    const onInit = async (size: number): Promise<void> => {
      await this.tasksRepository.update({ id: idleTask.id }, { size, started: new Date().getTime() });
    };

    const onProgress = async (downloaded: number, percentage: number, controller: AbortController): Promise<void> => {
      if (percentage === 100) {
        await this.tasksRepository.update(
          { id: idleTask.id },
          { downloaded, taskStatusId: 3, finished: new Date().getTime() },
        );
        this.logger.log(`Finished downloading ${idleTask.path}`);
      } else {
        const task = await this.tasksRepository.findOne({ where: { id: idleTask.id } });
        if (!task) {
          controller && controller.abort();
          this.logger.warn(`Downloading ${idleTask.url} to ${idleTask.path} has been interrupted.`);
          this.downloadService.removeFiles(idleTask);
          return;
        }
        await this.tasksRepository.update({ id: idleTask.id }, { downloaded });
      }
    };
    try {
      this.downloadService.handleTask(idleTask, { onInit, onProgress });
    } catch (e) {
      this.tasksRepository.update(
        { id: idleTask.id },
        {
          error: e,
          errorTime: new Date().getTime(),
        },
      );
    }
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

  async getDownloads(showId: number): Promise<IPageListResult<IDownload>> {
    const tasks = await this.tasksRepository.find({
      relations: { taskStatus: true, downloadResource: true, episode: { show: true } },
      order: { path: 'ASC' },
    });

    const groups = {};

    tasks?.forEach((task) => {
      const { episode } = task;
      const { show } = episode;
      if (!groups[show.id]) {
        groups[show.id] = {
          id: show.id,
          title: show.title,
          image: show.image,
          type: show.type,
          count: 0,
          episodes: [],
        };
      }

      const group = groups[show.id];
      const { episodes } = group;
      group.count += 1;
      if (showId === show.id || show.type === EShowTypes.MOVIE) {
        episodes.push({
          id: task.id,
          title: episode.episodeTitle(),
          subtitle: episode.episodeSubtitle(),
          resources: [task.downloadResource.name as EResource],
          status: task.taskStatus.name as ETaskStatus,
        });
      }
    });

    return { items: Object.values(groups) };
  }

  async getAllTasks(): Promise<ITask[]> {
    const tasks = await this.tasksRepository.find({
      relations: { taskStatus: true, downloadResource: true, episode: { show: true } },
      order: { taskStatusId: 'ASC' },
    });

    return (
      tasks?.map((task) => {
        return {
          id: task.id,
          started: task.started,
          finished: task.finished,
          size: task.size,
          downloaded: task.downloaded,
          resource: task.downloadResource.name as EResource,
          taskStatus: task.taskStatus.name as ETaskStatus,
          error: task.error,
          errorTime: task.errorTime,
        };
      }) ?? []
    );
  }

  async addTask(id: number, resource: EResource) {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (task) {
      throw new Error('The task has found');
    }
    switch (resource) {
      case EResource.AC: {
        return await this.addAnimeCultTask(id);
      }
      case EResource.ORORO:
      default: {
        return await this.addOroroTask(id);
      }
    }
  }

  async addOroroTask(episodeId: number) {
    const episode = await this.episodesRepository.findOne({ where: { id: episodeId }, relations: { show: true } });
    if (!episode?.show?.ororo || !episode?.ororo) {
      throw new Error('No episode found');
    }

    const { show } = episode;
    const ororoId = show.ororo.replace(/(shows|movies)-([\w-]*)/, '/$1/$2');
    if (show.type === EShowTypes.TVSHOW) {
      const downloadUrl = `${ORORO_URL}${ororoId}/videos/${episode.ororo}/download`;
      this.tasksRepository.insert({
        id: episode.id,
        path: getTVShowFilePath(show.title, show.year, episode.season, episode.episode, 'mp4'),
        url: downloadUrl,
        downloadResourceId: 1,
      });
    } else {
      const downloadUrl = `https://ororo.tv/en${ororoId}/download`;
      this.tasksRepository.insert({
        id: episode.id,
        path: getMovieFilePath(show.title, show.year, 'mp4'),
        url: downloadUrl,
        downloadResourceId: 1,
      });
    }
  }

  async addAnimeCultTask(episodeId: number) {
    const episode = await this.episodesRepository.findOne({ where: { id: episodeId }, relations: { show: true } });
    if (!episode?.show?.ac) {
      throw new Error('No episode found');
    }

    const { show } = episode;
    const downloadUrl = `${AC_URL}${show.ac}/episode/${episode.episode}`;
    if (show.type === EShowTypes.TVSHOW) {
      this.tasksRepository.insert({
        id: episode.id,
        path: getTVShowFilePath(show.title, show.year, episode.season, episode.episode, 'mp4'),
        url: downloadUrl,
        downloadResourceId: 2,
      });
    } else {
      this.tasksRepository.insert({
        id: episode.id,
        path: getMovieFilePath(show.title, show.year, 'mp4'),
        url: downloadUrl,
        downloadResourceId: 2,
      });
    }
  }

  async removeTask(id: number) {
    const task = await this.tasksRepository.findOne({
      relations: { taskStatus: true, downloadResource: true },
      where: { id },
    });
    await this.downloadService.removeFiles(task);
    return await this.tasksRepository.delete({ id });
  }
}
