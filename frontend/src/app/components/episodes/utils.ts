import { IEpisode } from '~shared/.ifaces';

export const NUMBER_EPISODES_IN_LIST = 50;

export interface ISeason {
  name: string;
  seasonNumber: number;
}

export const getHashParams = (hash = '#'): Record<string, string> => {
  const result = {};
  const splitted = hash.replace(/#/, '').split(/&/);

  splitted.forEach((pair: string) => {
    const [name, value = ''] = pair.split(/=/);
    if (name) {
      result[name] = value;
    }
  });
  return result;
};

const dec = (num: number): number => (num <= 10 ? 0 : Math.floor((num - 1) / 10));

export const groupSeasons = (seasons: number[], selectedSeason: number): ISeason[] => {
  const selectedDec = dec(selectedSeason);
  const lastSeason = seasons[seasons.length - 1];
  const firstElementIsZero = seasons[0] === 0;
  return seasons
    .map((season: number, idx: number) => {
      const seasonNumber = seasons[idx];
      const currentDec = dec(seasonNumber);
      if (currentDec === selectedDec) {
        return { name: season, seasonNumber: season };
      } else if (seasonNumber === 0 || ((seasonNumber - 1) % 10 === 0 && (seasonNumber !== 1 || !firstElementIsZero))) {
        const name = `${seasonNumber}${seasonNumber <= seasons.length && ' - '}${Math.min(
          (currentDec + 1) * 10,
          lastSeason,
        )}`;
        return {
          name,
          seasonNumber,
        };
      } else {
        return null;
      }
    })
    .filter((item) => item !== null) as ISeason[];
};

export const getEpisodeGroups = (episodes: IEpisode[]): string[] => {
  const result = [] as string[];
  const episodeCount = episodes?.length ?? 0;
  if (episodeCount > NUMBER_EPISODES_IN_LIST) {
    for (let i = 0, l = episodeCount / NUMBER_EPISODES_IN_LIST; i < l; i++) {
      const start = i * NUMBER_EPISODES_IN_LIST;
      result.push(
        `${start + 1}${episodeCount > start ? ' - ' : ''}${Math.min(episodeCount, start + NUMBER_EPISODES_IN_LIST)}`,
      );
    }
  }

  return result;
};
