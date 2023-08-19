export interface ISearchItem {
  id: number;
  title: string;
  magnet?: string;
  seeds?: number;
  peers?: number;
  size?: string;
  date?: number;
}