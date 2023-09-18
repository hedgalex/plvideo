
/** 
 * Enum for file types
 * */
export enum FileTypes {
	VIDEO = 0,
	SUBTITLES = 1,
};

/** 
 * Interface for a torrent file
 * */
export interface TorrentContentFile {
	id: number;
	name: string;
	size: string;
	rawSize: number;
	path: string;
	type: 'folder' | 'file' | 'movie' | 'subtitles';
}

/**
 * Get files details from a torrent
 * @param {string} magnet - The magnet link
 * @param {string} path - The temp path to download the torrent files
 * @returns {Promise<TorrentContentFile[]>} Promise of an array of files details.
 */
export declare function getTorrentInfo(magnet: string, path: string): Promise<TorrentContentFile[]>;