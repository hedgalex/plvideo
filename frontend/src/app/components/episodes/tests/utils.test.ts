import { groupSeasons } from '../utils';

describe('Utils test', () => {
  test('should return []', () => {
    const result = groupSeasons([], 0);
    expect(result).toEqual([]);
  });

  test('should return [{ name: 0, seasonNumber: 0 }]', () => {
    const result = groupSeasons([0], 0);
    expect(result).toEqual([{ name: 0, seasonNumber: 0 }]);
  });

  test('should return a group 0 - 10 and list of seasons from 11 to 15', () => {
    const result = groupSeasons([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 11);
    expect(result).toEqual([
      { name: '0 - 10', seasonNumber: 0 },
      { name: 11, seasonNumber: 11 },
      { name: 12, seasonNumber: 12 },
      { name: 13, seasonNumber: 13 },
      { name: 14, seasonNumber: 14 },
      { name: 15, seasonNumber: 15 },
    ]);
  });

  test('should return a group 1 - 10 and list of seasons from 11 to 15', () => {
    const result = groupSeasons([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 11);
    expect(result).toEqual([
      { name: '1 - 10', seasonNumber: 1 },
      { name: 11, seasonNumber: 11 },
      { name: 12, seasonNumber: 12 },
      { name: 13, seasonNumber: 13 },
      { name: 14, seasonNumber: 14 },
      { name: 15, seasonNumber: 15 },
    ]);
  });

  test('should return a list of seasons from 0 - 10 and group of seasons 11 - 15', () => {
    const result = groupSeasons([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 0);
    expect(result).toEqual([
      { name: 0, seasonNumber: 0 },
      { name: 1, seasonNumber: 1 },
      { name: 2, seasonNumber: 2 },
      { name: 3, seasonNumber: 3 },
      { name: 4, seasonNumber: 4 },
      { name: 5, seasonNumber: 5 },
      { name: 6, seasonNumber: 6 },
      { name: 7, seasonNumber: 7 },
      { name: 8, seasonNumber: 8 },
      { name: 9, seasonNumber: 9 },
      { name: 10, seasonNumber: 10 },
      { name: '11 - 15', seasonNumber: 11 },
    ]);
  });

  test('should return a list of seasons from 1 - 10 and group of seasons 11 - 15', () => {
    const result = groupSeasons([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 3);
    expect(result).toEqual([
      { name: 1, seasonNumber: 1 },
      { name: 2, seasonNumber: 2 },
      { name: 3, seasonNumber: 3 },
      { name: 4, seasonNumber: 4 },
      { name: 5, seasonNumber: 5 },
      { name: 6, seasonNumber: 6 },
      { name: 7, seasonNumber: 7 },
      { name: 8, seasonNumber: 8 },
      { name: 9, seasonNumber: 9 },
      { name: 10, seasonNumber: 10 },
      { name: '11 - 15', seasonNumber: 11 },
    ]);
  });
});
