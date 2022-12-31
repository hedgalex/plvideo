export const RECENT_COOKIE_NAME = 'recent';

export const getRecents = (oldList: string): number[] => {
  const splittedIds = oldList?.split('|') ?? [];
  return splittedIds.map((item) => Number.parseInt(item));
};

export const addRecent = (id: number, oldList: string): string => {
  const recentIds = getRecents(oldList);

  if (recentIds.includes(id)) {
    return oldList;
  }

  recentIds.push(id);
  const newCookies = recentIds.slice(-5).join('|');
  return newCookies;
};
