import { EShowTypes } from './EShowTypes';
import { EResource } from './EResource';
import { EStatus } from './EStatus';
import { EFileTypes } from './EFileTypes';

export const getSeason = (season: number | string): string => {
  const seasonName = String(season).length === 1 ? `0${season}` : season;
  return `Season ${seasonName}`;
};

export const getFullEpisodeId = (season: number | string, episode: number | string): string => {
  const seasonName = String(season).length === 1 ? `0${season}` : season;
  const episodeName = String(episode).length === 1 ? `0${episode}` : episode;
  return `s${seasonName}e${episodeName}`;
};

export { EShowTypes, EResource, EStatus, EFileTypes };