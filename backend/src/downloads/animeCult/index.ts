import axios from 'axios';
import parse, { HTMLElement } from 'node-html-parser';
import { Logger } from '@nestjs/common';
import { Tasks } from '~server/entities/tasks';
import { directDownload, removeFile } from '../utils';
import { IDownloaderProps } from '../.ifaces/IDownloaderProps';
import { configService } from '../../config/config.service';

const logger = new Logger('AnimeCultDownloader');

const AnimeCultDownloader = () => {
  const findSibnetSubs = (root: HTMLElement): HTMLElement => {
    return root.querySelectorAll('.serial').find((item) => {
      const isSibnet = item.querySelector('.serial-source-img').getAttribute('src')?.indexOf('sibnet') !== -1;
      const isSubs = item.querySelector('.serial-translator-img').getAttribute('src')?.indexOf('subs') !== -1;

      return isSibnet && isSubs;
    });
  };

  const findEnglishSubs = (root: HTMLElement): HTMLElement => {
    return root.querySelectorAll('.serial').find((item) => {
      const isSibnet = item.querySelector('.serial-source-img').getAttribute('src')?.indexOf('english') !== -1;
      const isSubs = item.querySelector('.serial-translator-img').getAttribute('src')?.indexOf('subs') !== -1;

      return isSibnet && isSubs;
    });
  };

  const findSibnetDub = (root: HTMLElement): HTMLElement => {
    return root.querySelectorAll('.serial').find((item) => {
      const isSibnet = item.querySelector('.serial-source-img').getAttribute('src')?.indexOf('sibnet') !== -1;
      const isDub = item.querySelector('.serial-translator-img').getAttribute('src')?.indexOf('dub') !== -1;

      return isSibnet && isDub;
    });
  };

  const downloadSibnet = async (sibnetEpisode: HTMLElement, task: Tasks, props: IDownloaderProps) => {
    const videoCultId = sibnetEpisode?.querySelector('.serial-video')?.getAttribute('id')?.replace(`video`, '');

    const { data: iframeData } = await axios.get(`https://z.animecult.org/personal/ajax?id=${videoCultId}`, {
      headers: { Cookie: configService.getAnimecultCookies() },
    });

    if (!iframeData) {
      logger.error('Not authorised in AnimeCult');
    }

    const partSibnetUrl = parse(iframeData).getElementsByTagName('iframe')[0].getAttribute('src');
    const sibnetUrl = partSibnetUrl?.startsWith('http') ? partSibnetUrl : `https:${partSibnetUrl}`;

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

  const downloadMikadox = async (englishEpisode: HTMLElement, task: Tasks, props: IDownloaderProps) => {
    const videoCultId = englishEpisode?.querySelector('.serial-video')?.getAttribute('id')?.replace(`video`, '');

    const { data: iframeData } = await axios.get(`https://z.animecult.org/personal/ajax?id=${videoCultId}`, {
      headers: { Cookie: configService.getAnimecultCookies() },
    });

    const url = parse(iframeData).getElementsByTagName('iframe')[0].getAttribute('src');

    const { data: videoContent } = await axios.get(url, { headers: { 'accept-encoding': '' } });
    const videoUrl = videoContent.match(/createPlayer\("v=([\s\S]*?)\\u0026/)?.[1];

    if (!videoUrl) {
      logger.error('Have not found video URL');
      return;
    }

    directDownload(decodeURIComponent(videoUrl), task.path, {
      headers: {
        Connection: 'keep-alive',
      },
      ...props,
    });
  };

  const download = async (task: Tasks, props: IDownloaderProps) => {
    const response = await axios.get(task.url);
    const { data } = response;

    const root = parse(data);

    const sibnetSubsEpisode = findSibnetSubs(root);
    if (sibnetSubsEpisode) {
      try {
        await downloadSibnet(sibnetSubsEpisode, task, props);
        return;
      } catch (e) {
        logger.warn('sibnetSubs not available');
      }
    } else {
      logger.warn('sibnetSubs not found');
    }

    const mikadoxSubsEpisode = findEnglishSubs(root);

    if (mikadoxSubsEpisode) {
      try {
        await downloadMikadox(mikadoxSubsEpisode, task, props);
        return;
      } catch (e) {
        logger.warn('mikadox source not available');
      }
    } else {
      logger.warn('mikadox source not found');
    }

    const sibnetDubEpisode = findSibnetDub(root);
    if (sibnetDubEpisode) {
      try {
        await downloadSibnet(sibnetDubEpisode, task, props);
        return;
      } catch (e) {
        console.info('sibnetDub not available');
      }
    } else {
      logger.warn('sibnetDub source not found');
    }
  };

  const removeFiles = async (task: Tasks) => {
    removeFile(task.path);
  };

  return {
    download,
    removeFiles,
  };
};

const animeCultDownloader = AnimeCultDownloader();

export { animeCultDownloader };
