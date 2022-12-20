import { EResource, EShowTypes } from '../.consts';
import { IEpisode } from './IEpisode';

export interface IPageShow {
  resource: EResource;
  title: string;
  image: string;
  description: string;
  year: number;
  type: EShowTypes;
  episodes: IEpisode[];
  seasons: number[];
  resourceShowId: string;
}