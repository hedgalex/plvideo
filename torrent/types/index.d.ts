interface TorrentContentFile {
	name: string;
	size: number;
	path: string;
}

/**
 * Get files details from a torrent
 * @param {string} magnet - The magnet link
 * @param {string} path - The temp path to download the torrent files
 * @returns {Promise<TorrentContentFile[]>} Promise of an array of files details.
 */
export declare function getTorrentInfo(magnet: string, path: string): Promise<TorrentContentFile[]>;