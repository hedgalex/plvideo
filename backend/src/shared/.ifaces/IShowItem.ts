import  { EResource, EShowTypes } from '~shared/.consts';

export interface IShowItem {
  showId: number;
  resource: EResource;
  resourceShowId?: string;
  resourceEpisodeId?: string;
  title: string;
  type?: EShowTypes;
  imagePreview?: string;
  year?: number;
  episodes?: number;
}