import { ETaskStatus } from '../.consts/ETaskStatus';
import { EResource } from '../.consts/EResource';

export interface ITask {
	id: number;
	title: string;
	subtitle: string;
	image: string;
	hash: number;
	started: number;
	finished: number;
	size: number;
	downloaded: number;
	resource: EResource;
	taskStatus: ETaskStatus,
}