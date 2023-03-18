import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { EResource, getFullEpisodeId } from '~shared/.consts';
import { IEpisode } from '~shared/.ifaces';
import { Episode } from '../episode';
import { Seasons } from './Seasons';
import { getEpisodeGroups, getHashParams, groupSeasons, NUMBER_EPISODES_IN_LIST } from './utils';
import { Container } from './styles';
import { EpisodeGroups } from './EpisodeGroups';

export interface IEpisodesProps {
  episodes?: IEpisode[];
}

export const Episodes: React.FC<IEpisodesProps> = ({ episodes = [] }) => {
  const navigate = useNavigate();
  const seasons = useMemo(() => {
    const seasonsObject: Record<string, number> = {};
    if (episodes) {
      episodes.forEach((episode) => (seasonsObject[episode.season] = episode.season));
    }
    return Object.values(seasonsObject);
  }, [episodes]);

  const { hash = '#' } = useLocation();
  const { season = '1', episodeGroup = '0' } = getHashParams(hash);
  const urlSeason = parseInt(season) ?? seasons[0];
  const urlEpisodeGroup = parseInt(episodeGroup);

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
      <Seasons current={currentSeason} list={groupedSeasons} onChange={handleChangeSeason} />
      <EpisodeGroups list={episodeGroups} current={episodeGroupIndex} onChange={handleChangeEpisodeGroup} />
      {episodesInGroup.map((episode) => (
        <Episode
          key={episode.id}
          id={episode.id}
          showId={episode.id}
          title={episode.title ?? `Episode ${episode.episode}`}
          subtitle={getFullEpisodeId(episode.season, episode.episode)}
          resources={episode.resources}
          isDownloadable={episode.resources.includes(EResource.ORORO) || episode.resources.includes(EResource.AC)}
        />
      ))}
    </Container>
  );
};
