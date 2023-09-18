import { EStatus } from '../.consts/EStatus';
import { EResource } from '../.consts/EResource';

export interface ITask {
	id: number;
	started: number;
	finished: number;
	size: number;
	downloaded: number;
	resource: EResource;
	taskStatus: EStatus,
	error?: string;
	errorTime?: number;
}