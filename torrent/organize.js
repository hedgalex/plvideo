const hash = require('./hash');

function sortCallback(a, b) {
	return b.isFolder - a.isFolder || a.path.localeCompare(b.path);
}

/**
 * Sorts files in a torrent.
 * @param {TorrentContentFile[]} items - The files to sort.
 * @returns {TorrentContentFile[]}
 */
function createTree(items) {
	const result = {};
	
	items.forEach((item) => {
		const name = item.name;
		let current = result;
		let parentPath = '';
		item.path.split('/').forEach((part) => {
			parentPath = parentPath ? `${parentPath}/${part}` : part;
			if (!current[part]) {
				current[part] = name === part ? { ...item, isFolder: false } : { id: 0, isFolder: true, name: part, path: parentPath, content: {} };
			}
			if (name !== part) {
				current = current[part].content;
			}
		});
	});

	return result;
};

/**
 * Sorts files in a torrent.
 * @param {TorrentContentFile[]} items - The files to sort.
 * @returns {TorrentContentFile[]}
 */
function createSortedList(tree) {
	const result = [];
	const sortedItems = Object.values(tree).sort(sortCallback);

	sortedItems.forEach((item) => {
		if (item.isFolder) {
			result.push({ id: 0, name: item.name, path: item.path, isFolder: true });
			const items = createSortedList(item.content);
			
			items.forEach((subItem) => {
				result.push(subItem);
			});	
		} else {
			result.push(item);
		}
	});

	return result;
}

function organizeFiles (files) {
	const tree = createTree(files);
	const items = createSortedList(tree);
	
	return items;
}

module.exports = organizeFiles;