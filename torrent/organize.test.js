const organizeFiles = require('./organize');

describe('organizeFiles', () => {
  test('should return organized files', () => {
		const input = [
			{ id: 1, path: 'path/file1.txt', name: 'file1.txt' },
			{ id: 2, path: 'path/path2/file7.txt', name: 'file7.txt'},
			{ id: 3, path: 'path/path1/file5.txt', name: 'file5.txt'},
			{ id: 4, path: 'path/file2.txt', name: 'file2.txt'},
			{ id: 6, path: 'path/path1/file4.txt', name: 'file4.txt'},
			{ id: 7, path: 'path/path2/file6.txt', name: 'file6.txt'},
		];

		const expectedOutput = [
      { id: 0, name: 'path', path: 'path', isFolder: true },
      { id: 0, name: 'path1', path: 'path/path1', isFolder: true },
      {
        id: 6,
        path: 'path/path1/file4.txt',
        name: 'file4.txt',
        isFolder: false
      },
      {
        id: 3,
        path: 'path/path1/file5.txt',
        name: 'file5.txt',
        isFolder: false
      },
      { id: 0, name: 'path2', path: 'path/path2', isFolder: true },
      {
        id: 7,
        path: 'path/path2/file6.txt',
        name: 'file6.txt',
        isFolder: false
      },
      {
        id: 2,
        path: 'path/path2/file7.txt',
        name: 'file7.txt',
        isFolder: false
      },
      { id: 1, path: 'path/file1.txt', name: 'file1.txt', isFolder: false },
      { id: 4, path: 'path/file2.txt', name: 'file2.txt', isFolder: false }
    ];

    const result = organizeFiles(input);
    expect(result).toEqual(expectedOutput);
  });

	test('should return organized files 2', () => {
    const input = [
			{ id: 1, path: 'path/file1.txt', name: 'file1.txt' },
			{ id: 2, path: 'path/path2/file7.txt', name: 'file7.txt'},
			{ id: 3, path: 'path/path1/file5.txt', name: 'file5.txt'},
			{ id: 4, path: 'path/file2.txt', name: 'file2.txt'},
			{ id: 8, path: 'path/path3/path4/file10.txt', name: 'file10.txt'},
			{ id: 9, path: 'path/path3/file9.txt', name: 'file9.txt'},
			{ id: 5, path: 'path/path1/file3.txt', name: 'file3.txt'},
			{ id: 6, path: 'path/path1/file4.txt', name: 'file4.txt'},
			{ id: 7, path: 'path/path2/file6.txt', name: 'file6.txt'},
		];

		const expectedOutput = [
      { id: 0, name: 'path', path: 'path', isFolder: true },
      { id: 0, name: 'path1', path: 'path/path1', isFolder: true },
      {
        id: 5,
        path: 'path/path1/file3.txt',
        name: 'file3.txt',
        isFolder: false
      },
      {
        id: 6,
        path: 'path/path1/file4.txt',
        name: 'file4.txt',
        isFolder: false
      },
      {
        id: 3,
        path: 'path/path1/file5.txt',
        name: 'file5.txt',
        isFolder: false
      },
      { id: 0, name: 'path2', path: 'path/path2', isFolder: true },
      {
        id: 7,
        path: 'path/path2/file6.txt',
        name: 'file6.txt',
        isFolder: false
      },
      {
        id: 2,
        path: 'path/path2/file7.txt',
        name: 'file7.txt',
        isFolder: false
      },
      { id: 0, name: 'path3', path: 'path/path3', isFolder: true },
      { id: 0, name: 'path4', path: 'path/path3/path4', isFolder: true },
      {
        id: 8,
        path: 'path/path3/path4/file10.txt',
        name: 'file10.txt',
        isFolder: false
      },
      {
        id: 9,
        path: 'path/path3/file9.txt',
        name: 'file9.txt',
        isFolder: false
      },
      { id: 1, path: 'path/file1.txt', name: 'file1.txt', isFolder: false },
      { id: 4, path: 'path/file2.txt', name: 'file2.txt', isFolder: false }
    ];

    const result = organizeFiles(input);
    expect(result).toEqual(expectedOutput);
  });
});