import  { EShowTypes } from '~shared/.consts';

export interface ISearchItem {
  imdbId?: string;
  providerTypeId: number;
  serviceId?: string;
  title: string;
  type: EShowTypes;
  imagePreview?: string;
  year?: number;
  link?: string;
  episodes?: number;
}