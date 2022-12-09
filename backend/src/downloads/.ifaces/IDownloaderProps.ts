import { RawAxiosRequestHeaders } from 'axios';

export interface IDownloaderProps {
  headers?: RawAxiosRequestHeaders;
  onInit?: (size: number) => void;
  onProgress?: (transfered: number, percentage: number) => void;
}
