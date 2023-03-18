import axios from 'axios';
import parse, { HTMLElement } from 'node-html-parser';
import youtubedl from 'youtube-dl-exec';
import { Logger } from '@nestjs/common';
import { Tasks } from '~server/entities/tasks';
import { directDownload, removeFile } from '../utils';
import { IDownloaderProps } from '../.ifaces/IDownloaderProps';
import { configService } from '../../config/config.service';

enum EResourceName {
  VK = 'VK',
  SIBNET = 'Sibnet',
  MIKADOX = 'Mikadox',
}

interface Resources {
  name: EResourceName;
  search: string;
  type: string;
}

const logger = new Logger('AnimeCultDownloader');
const FILTER_ORDER = [
  // { name: EResourceName.VK, search: 'vk-', type: 'subs' },
  { name: EResourceName.SIBNET, search: 'sibnet', type: 'subs' },
  { name: EResourceName.MIKADOX, search: 'english', type: 'subs' },
  { name: EResourceName.SIBNET, search: 'sibnet', type: 'dub' },
] as Resources[];

const AnimeCultDownloader = () => {
  const filterSources = (root: HTMLElement, resource: Resources): { videoId: string; resource: Resources }[] => {
    return root
      .querySelectorAll('.serial')
      .filter((item) => {
        const foundName = item.querySelector('.serial-source-img').getAttribute('src')?.indexOf(resource.search) !== -1;
        const foundType =
          item.querySelector('.serial-translator-img').getAttribute('src')?.indexOf(resource.type) !== -1;

        return foundName && foundType;
      })
      .map((element) => {
        const videoId = element?.querySelector('.serial-video')?.getAttribute('id')?.replace(`video`, '');
        return { videoId, resource };
      });
  };

  const downloadSibnet = async (url: string, task: Tasks, props: IDownloaderProps) => {
    const sibnetUrl = url?.startsWith('http') ? url : `https:${url}`;

    const { data: videoContent } = await axios.get(sibnetUrl);
    const [, videoUrl = ''] = videoContent.match(/[\S\s]*?player.src\(\[\{src:\s*?"(.+?)"[\S\s]*/) ?? [false, false];

    if (!videoUrl) {
      throw new Error('Have not found video URL');
    }

    directDownload(`https://video.sibnet.ru${videoUrl}`, task.path, {
      headers: {
        Referer: sibnetUrl,
        Connection: 'keep-alive',
      },
      ...props,
    });
  };

  const downloadMikadox = async (url: string, task: Tasks, props: IDownloaderProps) => {
    const { data: videoContent } = await axios.get(url, { timeout: 20000, headers: { 'accept-encoding': '' } });
    const videoUrl = videoContent.match(/createPlayer\("v=([\s\S]*?)\\u0026/)?.[1];

    if (!videoUrl) {
      throw new Error('Have not found video URL');
    }

    directDownload(decodeURIComponent(videoUrl), task.path, {
      headers: {
        Connection: 'keep-alive',
      },
      ...props,
    });
  };

  const downloadVK = async (url: string, task: Tasks, props: IDownloaderProps) => {
    console.info(url, task, props);
    const data = await youtubedl('https://www.youtube.com/watch?v=6xKWiCMKKJg', {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
    });

    console.info('vk output', data);
  };

  const download = async (task: Tasks, props: IDownloaderProps) => {
    const response = await axios.get(task.url);
    const { data } = response;

    const root = parse(data);
    const items = FILTER_ORDER.map((resource) => filterSources(root, resource)).flat();

    for (const item of items) {
      try {
        const videoCultId = item.videoId;
        const { data: iframeData } = await axios.get(`https://z.animecult.org/personal/ajax?id=${videoCultId}`, {
          timeout: 20000,
          headers: { Cookie: configService.getAnimecultCookies() },
        });

        if (!iframeData) {
          logger.error('Not authorised in AnimeCult');
        }
        const url = parse(iframeData).getElementsByTagName('iframe')[0].getAttribute('src');

        switch (item.resource.name) {
          case EResourceName.VK:
            await downloadVK(url, task, props);
            break;
          case EResourceName.SIBNET:
            await downloadSibnet(url, task, props);
            break;
          case EResourceName.MIKADOX:
            await downloadMikadox(url, task, props);
            break;
        }
        break;
      } catch (e) {
        logger.warn(`Could not able to download using ${item.resource.name}.${item.resource.type}`);
      }
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
