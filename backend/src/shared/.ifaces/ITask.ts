import { ETaskStatus } from '../.consts/ETaskStatus';
import { EResource } from '../.consts/EResource';

export interface ITask {
	id: number;
	started: number;
	finished: number;
	size: number;
	downloaded: number;
	resource: EResource;
	taskStatus: ETaskStatus,
	error?: string;
	errorTime?: number;
}