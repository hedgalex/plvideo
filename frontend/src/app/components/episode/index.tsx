import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box as RatingBlock } from '@mui/material';
import { useProgress } from '~app/hooks/useProgress';
import { EResource } from '~shared/.consts';
import { useAppDispatch } from '~store/index';
import { addShowAction } from '~store/pageSlice';
import { Progress } from './blocks/Progress';
import { Rating } from './blocks/Rating';
import { Size } from './blocks/Size';
import { DownloadAction } from './blocks/DownloadAction';
import { Popularity } from './blocks/Popularity';
import { Info, EpisodeItem, ItemImage, Title, Subtitle, NamesBlock, StatisticsBlock } from './styles';

export interface IEpisodeProps {
  id?: number;
  showId?: number;
  title?: string;
  subtitle?: string | number;
  resources?: EResource[];
  resourceShowId?: string;
  resourceEpisodeId?: string;
  image?: string;
  isDownloadable?: boolean;
  popularity?: number;
  popularityIncline?: number;
  ratingImdb?: number;
  votedImdb?: number;
  isProgressShown?: boolean;
}

export const Episode: React.FC<IEpisodeProps> = ({
  id = 0,
  showId = 0,
  title = '',
  subtitle = '',
  resources = [],
  resourceShowId = '',
  image,
  isDownloadable = false,
  popularity,
  popularityIncline,
  ratingImdb,
  votedImdb,
  isProgressShown = false,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isShowRequested, setShowRequested] = useState<boolean>(false);
  const { status, changeStatus, size, downloaded, error } = useProgress(id, {
    enabled: !!id && isDownloadable,
  });

  const handleActionClick = useCallback(() => {
    const resource = resources.find((item) => item !== EResource.IMDB);
    changeStatus(resource);
  }, [status, resources]);

  const navigateToShowsPage = async () => {
    if (!showId) {
      return;
    }
    setShowRequested(true);
    if (resourceShowId) {
      await dispatch(addShowAction({ resource: resources[0], resourceShowId, showId }));
    }
    navigate(`/show/${showId}`);
  };

  return (
    <EpisodeItem loading={isShowRequested} isProgressShown={isProgressShown} hasImage={!!image}>
      {!isShowRequested && (
        <>
          {image && <ItemImage src={image} />}
          <Info>
            <StatisticsBlock>
              <Progress status={status} downloaded={downloaded} />
              <Popularity value={popularity} incline={popularityIncline} />
            </StatisticsBlock>
            <NamesBlock onClick={navigateToShowsPage} isClickAllowed={!isDownloadable}>
              <Title hasError={!!error}>{title}</Title>
              <Subtitle>{subtitle}</Subtitle>
            </NamesBlock>
            <RatingBlock>
              <Size value={size} />
              <Rating value={ratingImdb} voted={votedImdb} />
            </RatingBlock>
            {isDownloadable && <DownloadAction status={status} onClick={handleActionClick} />}
          </Info>
        </>
      )}
    </EpisodeItem>
  );
};
