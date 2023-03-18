import { ITask } from '~shared/.ifaces';
import { EResource, ETaskStatus } from '~shared/.consts';

export interface IUseProgressResult {
  changeStatus: (resource?: EResource) => void;
  status: ETaskStatus;
  size: number;
  downloaded: number;
  started: number;
  finished: number;
  resource: EResource;
  error?: string,
  errorTime?: number,
}
