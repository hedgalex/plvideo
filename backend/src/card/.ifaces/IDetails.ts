import { IDetailsEpisode } from './IDetailsEpisode';
import { EResource, EShowTypes } from '~shared/.consts';

export interface IDetails {
	id: number;
	title: string;
	image: string;
	episodes: IDetailsEpisode[];
	resource: EResource;
	type: EShowTypes;
	description: string;
	year: number;
	imdb?: string;
	ororo?: string;
	ac?: string;
	popularity?: number;
	popularityIncline?: number;
	ratingImdb?: number;
	votedImdb?: number;
}