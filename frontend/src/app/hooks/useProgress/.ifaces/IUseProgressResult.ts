import { ITask } from '~shared/.ifaces';
import { EResource, EStatus } from '~shared/.consts';

export interface IUseProgressResult {
  changeStatus: (resource?: EResource) => void;
  status: EStatus;
  size: number;
  downloaded: number;
  started: number;
  finished: number;
  resource: EResource;
  error?: string,
  errorTime?: number,
}
