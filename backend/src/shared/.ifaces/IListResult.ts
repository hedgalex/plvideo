export interface IListResult<Item> {
  items: Item[];
  page?: number;
  count?: number;
}