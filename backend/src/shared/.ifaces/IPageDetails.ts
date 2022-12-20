import { EResource, EShowTypes } from '../.consts';
import { IEpisode } from './IEpisode';

export interface IPageDetails {
	title: string;
	image: string;
	episodes: IEpisode[];
	seasons: number[];
	resourceShowId: string;
	resource: EResource;
	type: EShowTypes;
	description: string;
	year: number;
}