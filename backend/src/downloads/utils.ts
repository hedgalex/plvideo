import * as fs from 'fs';
import * as path from 'path';
import progress from 'progress-stream';
import axios from 'axios';
import { AbortController } from 'node-abort-controller';
import { IDownloaderProps } from './.ifaces/IDownloaderProps';
import { readdir } from 'fs';
import { Logger } from '@nestjs/common';

const logger = new Logger('Utils');

export const directDownload = async (url: string, filepath: string, props: IDownloaderProps) => {
  // delete file if exists
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
  }

  // create path
  const dirName = path.dirname(filepath);
  if (!fs.existsSync(filepath)) {
    fs.mkdirSync(dirName, { recursive: true });
  }

  const fileWriteStream = fs.createWriteStream(filepath);
  const spyStream = progress({ time: 3000 });
  const abortController = new AbortController();

  spyStream.on('progress', (data: { transferred: number; percentage: number }): void => {
    if (props.onProgress) {
      props.onProgress(data?.transferred, data?.percentage, abortController);
    }
  });

  const response = await axios({
    method: 'get',
    url,
    responseType: 'stream',
    headers: props.headers,
    signal: abortController.signal,
  });

  if (props.onInit) {
    props.onInit(parseInt(response.headers['content-length'], 10));
  }

  response.data.pipe(spyStream).pipe(fileWriteStream);
};

export const removeFile = async (filepath: string): Promise<void> => {
  try {
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    const dirName = path.dirname(filepath);
    readdir(dirName, (_, files) => {
      if (files?.length === 0) {
        try {
          fs.unlinkSync(dirName);
        } catch (e) {
          logger.error(`Could not remove the directory ${dirName}`);
        }
      }
    });
  } catch (e) {
    logger.error(`Could not remove file ${filepath}`);
  }
};

export const getFullUrl = (url = '', protocol = 'https'): string => {
  return url.startsWith('http') ? url : `${protocol}:${url}`;
};
