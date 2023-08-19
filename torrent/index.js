const cache = require('memory-cache');
const ONE_HOUR = 60 * 60 * 1000;

function getClient() {
	return import('webtorrent').then(function(webtorrent) {
		return new webtorrent.default();
	});
} 

/**
 * Get files details from a torrent
 * @param {string} magnet - The magnet link
 * @param {string} path - The temp path to download the torrent files
 * @returns {TorerntContentFile[]} An array of files details.
 */
function getTorrentInfo (magnet, path) {
	return new Promise(function(resolve, reject) {
		const id = getHash(magnet);
		const cached = cache.get(id);
	
		if(cached) {
			resolve(cached);
			return;
		}
		
		getClient().then(function (client) {
			client.add(magnet, { path }, function (torrent) {
				const files = [];
				torrent.files.forEach((file) => {
					files.push({
						id: getHash(id + '-' + file.name),
						name: file.name,
						size: file.length,
						path: file.path	
					});
				});

				cache.put(id, files, ONE_HOUR);
				resolve(files);
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

