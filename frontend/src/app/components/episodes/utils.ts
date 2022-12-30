import { IEpisode } from '~shared/.ifaces';

export const NUMBER_EPISODES_IN_LIST = 50;

export interface ISeason {
  name: string;
  seasonNumber: number;
}

export const getHashParams = (hash = '#'): Record<string, number> => {
  const result = {};
  const splitted = hash.replace(/#/, '').split(/&/);

  splitted.forEach((pair: string) => {
    const [name, value = '1'] = pair.split(/=/);
    if (name) {
      result[name] = parseInt(value);
    }
  });
  return result;
};

export const groupSeasons = (seasons: number[], currentSeason: number): ISeason[] =>
  seasons
    .map((season: number, idx: number) => {
      if (Math.floor(idx / 10) === Math.floor(currentSeason / 10)) {
        return { name: season, seasonNumber: season };
      } else if (idx % 10 === 0) {
        return {
          name: `${seasons[idx]}${idx + 1 <= seasons.length && ' - '}${Math.min(idx + 9, seasons[seasons.length - 1])}`,
          seasonNumber: seasons[idx],
        };
      } else {
        return null;
      }
    })
    .filter((item) => item !== null) as ISeason[];

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
