import { EResource } from '../.consts/EResource';  
import { ISourceItem } from './ISourceItem';

export type ISources = {
  [key in EResource]?: ISourceItem[];
}