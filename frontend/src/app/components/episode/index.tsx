import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { EResource, ETaskStatus } from '~shared/.consts';
import { useProgress } from '~app/hooks/useProgress';
import { useAppDispatch } from '~store/index';
import { addShowAction } from '~store/pageSlice';
import { getSizeTitle } from './utils';
import {
  Action,
  Details,
  Download,
  Info,
  EpisodeItem,
  ItemImage,
  Title,
  Progress,
  Subtitle,
  ProgressInfo,
  Size,
  StyledSpinner,
} from './styles';

export interface IEpisodeProps {
  id?: number;
  title?: string;
  subtitle?: string;
  resources?: EResource[];
  resourceShowId?: string;
  resourceEpisodeId?: string;
  imagePreview?: string;
  isDownloadable?: boolean;
}

export const Episode: React.FC<IEpisodeProps> = ({
  id = 0,
  title = '',
  subtitle = '',
  resources = [],
  resourceShowId = '',
  imagePreview,
  isDownloadable = false,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, changeStatus, size, downloaded } = useProgress(id, {
    enabled: !!id && isDownloadable,
  });

  const handleActionClick = useCallback(() => {
    const resource = resources.find((item) => item !== EResource.IMDB);
    changeStatus(resource);
  }, [status, resources]);

  const navigateToShowsPage = async () => {
    await dispatch(addShowAction({ resource: resources[0], resourceShowId, showId: id }));
    navigate(`/show/${id}`);
  };

  return (
    <EpisodeItem>
      {imagePreview && <ItemImage src={imagePreview} />}
      <Info>
        <Progress>
          {status !== ETaskStatus.NONE && (
            <>
              <ProgressInfo>{downloaded}%</ProgressInfo>
              <Download completed={downloaded} />
            </>
          )}
        </Progress>
        <Details onClick={navigateToShowsPage} allowClick={!isDownloadable} hasImage={!!imagePreview}>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </Details>
        {size > 0 && <Size>{getSizeTitle(size)}</Size>}
        {isDownloadable && (
          <>
            {status === ETaskStatus.BUSY && <StyledSpinner />}
            {status !== ETaskStatus.BUSY && (
              <Action status={status} onClick={handleActionClick}>
                {status === ETaskStatus.NONE && <DownloadIcon />}
                {[ETaskStatus.IDLE, ETaskStatus.IN_PROGRESS, ETaskStatus.READY].includes(status) && (
                  <DeleteOutlineIcon />
                )}
              </Action>
            )}
          </>
        )}
      </Info>
    </EpisodeItem>
  );
};
