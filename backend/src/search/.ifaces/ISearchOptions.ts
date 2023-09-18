import { AxiosHeaders } from 'axios';

export interface ISearchOptions {
	type?: number;
	year?: number;
	episode?: number;
	season?: number;
	filterUserView?: boolean;
	headers?: AxiosHeaders | Record<string, string>;
}