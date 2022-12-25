export enum ETaskStatus {
	NONE = 'NONE',
	IDLE = 'IDLE',
	IN_PROGRESS = 'IN_PROGRESS',
	READY = 'READY',
	BUSY = 'BUSY',
}

export const taskStatusEnum = {
	IDLE: 'IDLE',
	IN_PROGRESS: 'IN_PROGRESS',
	READY: 'READY',
} as const;