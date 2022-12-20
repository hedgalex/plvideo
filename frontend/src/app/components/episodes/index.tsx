import { Box, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { EResource, EShowTypes, getFullEpisodeId } from '~shared/.consts';
import { IEpisode } from '~shared/.ifaces';
import { Episode } from '../episode';
import { getEpisodeGroups, getHashParams, groupSeasons, NUMBER_EPISODES_IN_LIST } from './utils';
import { Container, EpisodeGroup, EpisodeGroups, SeasonButton } from './styles';

export interface IEpisodesProps {
  seasons?: number[];
  episodes?: IEpisode[];
  allowDownload?: boolean;
  resource: EResource;
  resourceShowId: string;
}

export const Episodes: React.FC<IEpisodesProps> = ({
  resource,
  seasons = [],
  episodes = [],
  allowDownload = false,
  resourceShowId,
}) => {
  const navigate = useNavigate();
  const { hash = '#' } = useLocation();
  const { season: urlSeason = seasons[0] ?? 1, episodeGroup: urlEpisodeGroup = 0 } = getHashParams(hash);

  const [currentSeason, setCurrentSeason] = useState<number>(urlSeason);
  const [episodeGroupIndex, setEpisodeGroupIndex] = useState<number>(0);

  useEffect(() => {
    setCurrentSeason(urlSeason);
    setEpisodeGroupIndex(urlEpisodeGroup);
  }, [urlSeason, urlEpisodeGroup]);

  const groupedSeasons = groupSeasons(seasons, currentSeason);
  const episodesInSeason = episodes.filter((episode) => episode?.season === currentSeason);
  const episodeGroups = getEpisodeGroups(episodesInSeason);
  const episodesInGroup = useMemo(() => {
    if (episodesInSeason.length > NUMBER_EPISODES_IN_LIST) {
      const min = episodeGroupIndex * NUMBER_EPISODES_IN_LIST + 1;
      const max = (episodeGroupIndex + 1) * NUMBER_EPISODES_IN_LIST;
      return episodesInSeason.filter((episode) => episode.episode >= min && episode.episode <= max);
    }
    return episodesInSeason;
  }, [currentSeason, episodeGroupIndex]);

  const handleChangeEpisodeGroup = (index: number) => () => {
    navigate(`#season=${currentSeason}${index === 0 ? '' : `&episodeGroup=${index}`}`);
  };

  const handleChangeSeason = (seasonNumber: number) => () => {
    navigate(`#season=${seasonNumber}`);
  };

  return (
    <Container>
      {seasons.length > 1 && (
        <Box display="flex" p="10px 0 20px 0">
          <Typography m="0 5px 0 56px" pt="3px">
            Seasons:
          </Typography>
          <Box display="flex" ml="10px">
            {groupedSeasons.map((season) => (
              <SeasonButton
                key={season.seasonNumber}
                variant="outlined"
                className="season-button"
                isSelected={season.seasonNumber === currentSeason}
                onClick={handleChangeSeason(season.seasonNumber)}
              >
                {season.name}
              </SeasonButton>
            ))}
          </Box>
        </Box>
      )}
      {episodeGroups.length > 0 && (
        <EpisodeGroups>
          {episodeGroups.map((episodeGroup, index) => (
            <EpisodeGroup
              key={episodeGroup}
              selected={index === episodeGroupIndex}
              onClick={handleChangeEpisodeGroup(index)}
            >
              {episodeGroup}
            </EpisodeGroup>
          ))}
        </EpisodeGroups>
      )}
      {episodesInGroup.map((episode) => (
        <Episode
          key={episode.resourceEpisodeId}
          hash={episode.hash}
          title={episode.title ? episode.title : `Episode ${episode.episode}`}
          subtitle={getFullEpisodeId(episode.season, episode.episode)}
          resource={resource}
          resourceShowId={resourceShowId}
          resourceEpisodeId={episode.resourceEpisodeId}
          type={EShowTypes.TVSHOW}
          isDownloadable={allowDownload}
        />
      ))}
    </Container>
  );
};
