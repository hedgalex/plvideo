import { ETaskStatus } from '../.consts/ETaskStatus';
import { EResource } from '../.consts/EResource';

export interface ITask {
	id: number;
	showId: number;
	title: string;
	subtitle: string;
	image: string;
	started: number;
	finished: number;
	size: number;
	downloaded: number;
	resource: EResource;
	taskStatus: ETaskStatus,
	error?: string;
	errorTime: number;
}