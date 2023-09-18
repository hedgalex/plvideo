import { EResource, EShowTypes } from '../.consts';
import { IEpisode } from './IEpisode';

export interface ShowFiltered {
	id: number;
	title: string;
	image: string;
	episodes: IEpisode[];
	type: EShowTypes;
	description: string;
	year: number;
	popularity?: number;
	popularityIncline?: number;
	ratingImdb?: number;
	votedImdb?: number;
	sync?: number;
}