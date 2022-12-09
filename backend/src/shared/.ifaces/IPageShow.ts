import { EShowTypes } from '../.consts';

export interface IPageShow {
  imdbId?: string;
  providerTypeId?: number;
  title: string;
  imagePreview: string;
  description: string;
  year: number;
  type: EShowTypes;
}