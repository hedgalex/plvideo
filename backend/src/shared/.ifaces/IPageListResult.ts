export interface IPageListResult<Item> {
  items: Item[];
  page?: number;
  count?: number;
}