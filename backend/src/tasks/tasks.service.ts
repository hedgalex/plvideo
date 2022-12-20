import { Inject, Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from '~server/entities/tasks';
import { configService } from '../config/config.service';
import { DetailsService } from '../details/details.service';
import { DownloadService } from '../downloads/download.service';
import { getFullEpisodeId, getSeason } from '~shared/.consts';
import { hashShowId } from '../utils/hash';

const ORORO_URL = 'https://ororo.tv/en';
@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  @Inject(DownloadService)
  private readonly downloadService: DownloadService;
  @Inject(DetailsService)
  private readonly detailsService: DetailsService;
  private readonly watchdogTimeout: number;
  private readonly tvShowsDownloadPath: string;
  private readonly moviesDownloadPath: string;
  constructor(
    @InjectRepository(Tasks)
    private tasksRepository: Repository<Tasks>,
  ) {
    this.tvShowsDownloadPath = configService.getTVShowsDownloadPath();
    this.moviesDownloadPath = configService.getMoviesDownloadPath();
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
      relations: { taskStatus: true, downloadResource: true, show: true },
      order: { taskStatusId: 'ASC' },
    });
  }

  async addOroroTask(resourceShowId: string, resourceEpisodeId: string) {
    const ororoId = resourceShowId.replace(/(shows|movies)-([\w-]*)/, '/$1/$2');
    const show = await this.detailsService.getDetailsOroro(resourceShowId);
    const showName = `${show.title} (${show.year})`;
    const showId = hashShowId(show.title, show.year);
    if (resourceEpisodeId) {
      const episode = show?.episodes?.find((episode) => episode.resourceEpisodeId === resourceEpisodeId);
      if (episode) {
        const episodeNumber = getFullEpisodeId(episode.season, episode.episode);

        this.tasksRepository.insert({
          title: episodeNumber,
          showId,
          hash: episode.hash,
          path: `${this.tvShowsDownloadPath}/${showName}/${getSeason(episode.season)}/${
            show.title
          } - ${episodeNumber}.mp4`,
          url: `${ORORO_URL}${ororoId}/videos/${resourceEpisodeId}/download`,
          downloadResourceId: 1,
        });
      }
    } else {
      this.tasksRepository.insert({
        title: show.title,
        showId,
        hash: showId,
        path: `${this.moviesDownloadPath}/${showName}/${show.title} (${show.year}).mp4`,
        url: `${ORORO_URL}${ororoId}/videos/${resourceEpisodeId}/download`,
        downloadResourceId: 1,
      });
    }
  }

  async addAnimeCultTask(resourceShowId: string, resourceEpisodeId: string) {
    console.info(resourceShowId, resourceEpisodeId);

    if (resourceEpisodeId) {
      //tvshow
    } else {
      //movie
    }
    // this.tasksRepository.insert({

    // });
  }

  async removeTask(hash: number) {
    return await this.tasksRepository.delete({ hash });
  }
}
