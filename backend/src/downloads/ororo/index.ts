import { Logger } from '@nestjs/common';
import { Tasks } from '~server/entities/tasks';
import { configService } from '../../config/config.service';
import { directDownload } from '../utils';
import { IDownloaderProps } from '../.ifaces/IDownloaderProps';

const OroroDownloader = () => {
  const download = async (task: Tasks, props: IDownloaderProps) => {
    const logger = new Logger(OroroDownloader.name);

    if (!task.path) {
      logger.error('No path found');
      return;
    }

    const subtitlePath = task.path.replace('.mp4', '.srt');
    const headers = {
      Cookie: configService.getOroroCookies(),
      Connection: 'keep-alive',
    };

    await directDownload(`${task.url}_subtitle/en`, subtitlePath, { headers });

    await directDownload(task.url, task.path, {
      headers,
      ...props,
    });
  };

  return {
    download,
  };
};

const ororoDownloader = OroroDownloader();

export { ororoDownloader };
