import { EResource, EShowTypes, EStatus } from '../.consts';
import { IEpisode } from './IEpisode';

interface IDownloadEpisode {
	id: number;
	title: string;
	subtitle: string;
	status: EStatus;
	resources: EResource[];
};

export interface IDownload {
	id: number;
	title: string;
	image: string;
	count: number;
	episodes: IDownloadEpisode[];
	type: EShowTypes;
}