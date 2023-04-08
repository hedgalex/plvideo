import { IPageShowInfo } from './IPageShowInfo';
import { IPageListResult } from './IPageListResult';
import { IDownload } from './IDownload';

export type IPageContent = IPageListResult<any> | IPageShowInfo;