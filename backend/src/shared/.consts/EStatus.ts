export enum EStatus {
	NONE = 'NONE',
	IDLE = 'IDLE',
	IN_PROGRESS = 'IN_PROGRESS',
	READY = 'READY',
	BUSY = 'BUSY',
	STEADY = 'STEADY',
}

export const taskStatusEnum = {
	IDLE: 'IDLE',
	IN_PROGRESS: 'IN_PROGRESS',
	READY: 'READY',
} as const;