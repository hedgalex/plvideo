import  { EShowTypes } from '~shared/.consts';

export interface ISearchResultItem {
  id: number;
  title: string;
  imdb?: string;
  year?: number;
  type?: EShowTypes;
  image?: string;
  popularity?: number;
}