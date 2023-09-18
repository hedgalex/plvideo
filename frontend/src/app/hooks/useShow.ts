import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IEpisode, IPageShowInfo } from '~shared/.ifaces';
import { useLocationHash } from './useLocationHash';
import { useShowQuery } from '../queries/useShowQuery';

interface IUseShowProps {
  show: IPageShowInfo;
  isLoading: boolean;
  previewImage: string;
  selectedSeason: number;
  onSeasonChange: (seasonNumber: number) => void;
  seasons: number[];
  episodes: IEpisode[];
}

export const useShow = (): IUseShowProps => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { value0: seasonNumber } = useLocationHash() as { value0: number };

  const { isLoading, data } = useShowQuery({ showId: id });

  const [selectedSeason, setSelectedSeason] = useState<number>(seasonNumber);
  const [previewImage, setPreviewImage] = useState<string>('');
  const show = data as IPageShowInfo;

  const seasons = useMemo(() => {
    if (!show?.episodes) return [];
    const seasons = new Set<number>();
    show?.episodes.forEach((episode) => seasons.add(episode.season));

    return Array.from(seasons).sort((a, b) => (a > b ? 1 : -1));
  }, [show?.episodes]);

  const episodes = useMemo(() => {
    if (!show?.episodes) return [];
    return show?.episodes.filter((episode) => episode.season === selectedSeason);
  }, [show?.episodes, selectedSeason]);

  useEffect(() => {
    if (seasons.length === 0) return;
    if (seasons.indexOf(seasonNumber) === -1) {
      setSelectedSeason(seasons[0]);
      return;
    }

    setSelectedSeason(seasonNumber);
  }, [seasonNumber, seasons]);

  useEffect(() => {
    if (show?.image) {
      setPreviewImage(`${show?.image}?${new Date().getTime()}`);
    }
  }, [show?.image]);

  const handleSeasonChange = useCallback(
    (seasonNumber: number) => {
      navigate(`/show/${id}${seasonNumber ? `#${seasonNumber}` : ''}`);
    },
    [id],
  );

  return {
    show,
    seasons,
    episodes,
    selectedSeason,
    onSeasonChange: handleSeasonChange,
    previewImage,
    isLoading,
  };
};
