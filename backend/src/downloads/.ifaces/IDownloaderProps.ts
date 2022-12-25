import { RawAxiosRequestHeaders } from 'axios';
import { AbortController } from 'node-abort-controller';

export interface IDownloaderProps {
  headers?: RawAxiosRequestHeaders;
  onInit?: (size: number) => void;
  onProgress?: (transfered: number, percentage: number, abortController: AbortController) => void;
}
