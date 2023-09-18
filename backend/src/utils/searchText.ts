export const getTorrentSearchText = (season: number, episode: number): string => {
  const seasonString = season ? season?.toString().padStart(2, '0') : '';
  const episodeString = episode ? episode?.toString().padStart(2, '0') : '';

  if (seasonString && episodeString) {
    return ` S${seasonString}E${episodeString}`;
  }

  if (seasonString) {
    return ` Season ${seasonString}`;
  }

  return '';
};
