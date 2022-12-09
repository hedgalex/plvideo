export enum ETaskStatus {
	IDLE = 'IDLE',
	IN_PROGRESS = 'IN_PROGRESS',
	READY = 'READY',
}

export const taskStatusEnum = {
	IDLE: 'IDLE',
	IN_PROGRESS: 'IN_PROGRESS',
	READY: 'READY',
} as const;