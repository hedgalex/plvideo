export enum ETaskStatus {
	NONE = 'NONE',
	IDLE = 'IDLE',
	IN_PROGRESS = 'IN_PROGRESS',
	READY = 'READY',
	LOADING = 'LOADING',
}

export const taskStatusEnum = {
	IDLE: 'IDLE',
	IN_PROGRESS: 'IN_PROGRESS',
	READY: 'READY',
} as const;