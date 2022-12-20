import axios from 'axios';
import parse from 'node-html-parser';
import { Logger } from '@nestjs/common';
import { Tasks } from '~server/entities/tasks';
import { directDownload } from '../utils';
import { IDownloaderProps } from '../.ifaces/IDownloaderProps';
import { configService } from '../../config/config.service';

const AnimeCultDownloader = () => {
  const download = async (task: Tasks, props: IDownloaderProps) => {
    const logger = new Logger(AnimeCultDownloader.name);
    const response = await axios.get(task.url);
    const { data } = response;

    const root = parse(data);
    const episode = root.querySelectorAll('.serial').find((item) => {
      const isSibnet = item.querySelector('.serial-source-img').getAttribute('src')?.indexOf('sibnet') !== -1;
      const isSubs = item.querySelector('.serial-translator-img').getAttribute('src')?.indexOf('subs') !== -1;

      return isSibnet && isSubs;
    });

    if (!episode) {
      logger.error('Episode have not found');
      return;
    }

    const videoCultId = episode?.querySelector('.serial-video')?.getAttribute('id')?.replace(`video`, '');

    const { data: iframeData } = await axios.get(`https://z.animecult.org/personal/ajax?id=${videoCultId}`, {
      headers: { Cookie: configService.getOroroCookies() },
    });

    if (!iframeData) {
      logger.error('Not authorised in AnimeCult');
    }

    const partSibnetUrl = parse(iframeData).getElementsByTagName('iframe')[0].getAttribute('src');
    const sibnetUrl = `https:${partSibnetUrl}`;

    const { data: videoContent } = await axios.get(sibnetUrl);
    const [, videoUrl = ''] = videoContent.match(/[\S\s]*?player.src\(\[\{src:\s*?"(.+?)"[\S\s]*/);

    if (!videoUrl) {
      logger.error('Have not found video URL');
      return;
    }

    directDownload(`https://video.sibnet.ru${videoUrl}`, task.path, {
      headers: {
        Referer: sibnetUrl,
        Connection: 'keep-alive',
      },
      ...props,
    });
  };

  return {
    download,
  };
};

const animeCultDownloader = AnimeCultDownloader();

export { animeCultDownloader };
