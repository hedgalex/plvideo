import { configService } from '~config/config.service';
import { getFullEpisodeId, getSeason } from '~shared/.consts';

const tvShowsDownloadPath = configService.getTVShowsDownloadPath();
const moviesDownloadPath = configService.getMoviesDownloadPath();

export const getTVShowFilePath = (title: string, year: number, season: number, episode: number, ext: string) => {
  const showName = `${title} (${year})`;
  const episodeNumber = getFullEpisodeId(season, episode);
  return `${tvShowsDownloadPath}/${showName}/${getSeason(season)}/${title} - ${episodeNumber}.${ext}`;
};

export const getMovieFilePath = (title: string, year: number, ext: string) => {
  const showName = `${title} (${year})`;
  return `${moviesDownloadPath}/${showName}/${showName}.${ext}`;
};
