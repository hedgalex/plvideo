import { EResource } from '../.consts';

export interface IEpisode {
	id: number;
	title: string;
	season: number;
	episode: number;
	resources?: EResource[];
	release: number;
}