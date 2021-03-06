const TASK_LOAD = 'TASK_LOAD';
const TASK_LOAD_SUCCESS = 'TASK_LOAD_SUCCESS';
const TASK_LOAD_FAILED = 'TASK_LOAD_FAILED';
const TASK_ADD = 'TASK_ADD';
const TASK_ADD_SUCCESS = 'TASK_ADD_SUCCESS';
const TASK_ADD_FAILED = 'TASK_ADD_FAILED';
const TASK_REMOVE = 'TASK_REMOVE';
const TASK_REMOVE_SUCCESS = 'TASK_REMOVE_SUCCESS';
const TASK_REMOVE_FAILED = 'TASK_REMOVE_FAILED';

export const REST_URLS = {
	tasks: '/tasks',
	add: (name: string) => `/task/${name}`,
	remove: (name: string) => `/task/${name}`,
}

export {
	TASK_LOAD,
	TASK_LOAD_SUCCESS, 
	TASK_LOAD_FAILED, 
	TASK_ADD,
	TASK_ADD_SUCCESS, 
	TASK_ADD_FAILED,
	TASK_REMOVE, 
	TASK_REMOVE_SUCCESS,
	TASK_REMOVE_FAILED,
};