import { ISearchItem } from './ISearchItem';

export interface IPageSearchResult {
  items: ISearchItem[];
  page?: number;
  count?: number;
}