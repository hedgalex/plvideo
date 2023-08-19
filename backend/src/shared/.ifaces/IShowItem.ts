import  { EResource, EShowTypes } from '~shared/.consts';
import  { ISources } from './ISources';

export interface IShowItem {
  id: number;
  resources: EResource[];
  title: string;
  type?: EShowTypes;
  image?: string;
  year?: number;
  // episodes?: number;
  resourceShowId?: string;
  resourceEpisodeId?: string;
  popularity?: number;
  popularityIncline?: number;
  ratingImdb?: number;
  votedImdb?: number;
}
