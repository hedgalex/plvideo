import { EHeaders } from '../.consts/EHeaders';

export type Headers = {
	[keyof in EHeaders]?: string;
};
