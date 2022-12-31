import { Logger } from '@nestjs/common';
import { Tasks } from '~server/entities/tasks';
import { configService } from '../../config/config.service';
import { directDownload, removeFile } from '../utils';
import { IDownloaderProps } from '../.ifaces/IDownloaderProps';

const OroroDownloader = () => {
  const download = async (task: Tasks, props: IDownloaderProps) => {
    const logger = new Logger(OroroDownloader.name);

    if (!task.path) {
      logger.error('No path found');
      return;
    }

    const subtitlePathEn = task.path.replace('.mp4', '.en.srt');
    const subtitlePathRu = task.path.replace('.mp4', '.ru.srt');
    const headers = {
      Cookie: configService.getOroroCookies(),
      Connection: 'keep-alive',
    };

    await directDownload(`${task.url}_subtitle/en`, subtitlePathEn, { headers });
    await directDownload(`${task.url}_subtitle/ru`, subtitlePathRu, { headers });

    await directDownload(task.url, task.path, {
      headers,
      ...props,
    });
  };

  const removeFiles = async (task: Tasks) => {
    const subtitlePathEn = task.path.replace('.mp4', '.en.srt');
    const subtitlePathRu = task.path.replace('.mp4', '.ru.srt');

    await removeFile(task.path);
    await removeFile(subtitlePathEn);
    await removeFile(subtitlePathRu);
  };

  return {
    download,
    removeFiles,
  };
};

const ororoDownloader = OroroDownloader();

export { ororoDownloader };
