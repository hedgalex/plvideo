import { IShowItem } from './IShowItem';

export interface IPageSearchResult {
  items: Partial<IShowItem>[];
  page?: number;
  count?: number;
}