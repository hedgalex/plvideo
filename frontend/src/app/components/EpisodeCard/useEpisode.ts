import { useCallback, useEffect, useMemo, useState } from 'react';
import { getFullEpisodeId } from '~shared/.consts';
import { CardExtends } from '../Card/.iface/CardExtends';
import { UseCardResult, useCard } from '~hooks/useCard';

export type EpisodeCardProps = CardExtends & {
  isExpanded?: boolean;
  onExpand?: (id: number) => void;

  title?: string;
  episode?: number;
  season?: number;
  release?: number;
};

type UseEpisodeResult = UseCardResult & {
  id: number;
  isExpanded: boolean;
  text: string;
  subText: string;
  handleExpandMoreClick: () => void;
};

export const useEpisode = ({ id, season = 0, episode = 0, title }: EpisodeCardProps): UseEpisodeResult => {
  const card = useCard(id);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const subText = useMemo(() => {
    return getFullEpisodeId(season, episode);
  }, [episode, season]);

  const handleExpandMoreClick = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, [id]);

  useEffect(() => {
    console.info('render ', id);
  }, []);

  return {
    id,
    isExpanded,
    handleExpandMoreClick,
    subText,
    text: title ?? '',
    ...card,
  };
};
