import { Injectable } from '@nestjs/common';
import { Tasks } from '../entities/tasks';
import { animeCultDownloader } from './animeCult';
import { ororoDownloader } from './ororo';
import { IDownloaderProps } from './.ifaces/IDownloaderProps';

@Injectable()
export class DownloadService {
  async handleTask(task: Tasks, props: IDownloaderProps) {
    switch (task.downloadResource.name) {
      case 'ORORO': {
        ororoDownloader.download(task, props);
        break;
      }
      case 'ANIME_CULT': {
        animeCultDownloader.download(task, props);
        break;
      }
      default: {
        break;
      }
    }
  }

  async removeFiles(task: Tasks) {
    switch (task.downloadResource.name) {
      case 'ORORO': {
        ororoDownloader.removeFiles(task);
        break;
      }
      case 'ANIME_CULT': {
        animeCultDownloader.removeFiles(task);
        break;
      }
      default: {
        break;
      }
    }
  }
}
