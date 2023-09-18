const cache = require('memory-cache');
const hash = require('./hash');
const organizeFiles = require('./organize');

const ONE_HOUR = 60 * 60 * 1000;
const VIDEO_FILE_PATTERN = /\.(mp4|avi|mov|mkv|wmv|flv|webm)$/i;
const SUBTITLE_FILE_PATTERN = /\.(srt|sub|sbv|vtt|ass|ssa)$/i;

function getClient() {
	return import('webtorrent').then(function(webtorrent) {
		return new webtorrent.default();
	});
} 

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const sizeInUnit = bytes / Math.pow(k, i);
  return sizeInUnit.toFixed(1) + sizes[i];
}

/**
 * Get files details from a torrent
 * @param {string} magnet - The magnet link
 * @param {string} path - The temp path to download the torrent files
 * @returns {TorrentContentFile[]} An array of files details.
 */
function getTorrentInfo (magnet, path) {
	return new Promise(function(resolve, reject) {
		const id = hash(magnet);
		const cached = cache.get(id);

		if(cached) {
			resolve(cached);
			return;
		}
		
		getClient().then(function (client) {
			client.add(magnet, { path }, function (torrent) {
				const files = [];
				torrent.files.forEach((file) => {
					const length = file.length;
					const name = file.name;
					const isVideo = VIDEO_FILE_PATTERN.test(name);
					const isSubtitle = SUBTITLE_FILE_PATTERN.test(name);

					if(isVideo || isSubtitle) {
						files.push({
							id: hash(id, file.name),
							name: file.name,
							size: formatBytes(length),
							rawSize: length,
							path: file.path,
							isFolder: false,
							type: isVideo ? 'movie' : 'subtitles',
						});
					}
				});
				const result = organizeFiles(files);

				cache.put(id, result, ONE_HOUR);
				resolve(result);
				torrent.destroy();
			}, (err) => {
				reject(err);
			});
		}).catch((err) => {
			reject(err);
		});
	});
};

module.exports = {
  getTorrentInfo
};

