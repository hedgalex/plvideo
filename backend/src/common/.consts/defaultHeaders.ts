import { Headers } from '../.ifaces/Headers';
import { EHeaders } from './EHeaders';

export const defaultHeaders: Headers = {
	[EHeaders.UserAgent]: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
	[EHeaders.AcceptEncoding]: '',
};