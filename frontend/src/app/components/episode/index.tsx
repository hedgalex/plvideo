import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IShowItem } from '~shared/.ifaces';
import { ETaskStatus } from '~shared/.consts';
import { useProgress } from '~hooks/useProgress';
import { addTaskAction, removeTaskAction } from '~store/tasksSlice';
import { useAppDispatch } from '~store/index';
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
  onClick?: () => void;
  progress?: number;
  isDownloadable?: boolean;
  subtitle?: string;
}

export const Episode: React.FC<Partial<IShowItem> & IEpisodeProps> = ({
  title,
  hash,
  subtitle,
  resource,
  resourceShowId,
  resourceEpisodeId,
  imagePreview,
  isDownloadable,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const progress = useProgress(hash ?? 0, { enabled: !!hash && isDownloadable });
  const [status, setStatus] = useState<ETaskStatus>(progress.taskStatus);

  const handleClick = async () => {
    console.info(hash);
    navigate(`/show/${hash}`);
  };

  const handleActionClick = useCallback(() => {
    if (status === ETaskStatus.LOADING) {
      return;
    }

    if (status === ETaskStatus.NONE && resourceShowId && resource) {
      setStatus(ETaskStatus.LOADING);
      dispatch(addTaskAction({ resource, resourceShowId, resourceEpisodeId }));
    }

    if ([ETaskStatus.IN_PROGRESS, ETaskStatus.READY].includes(status) && hash) {
      setStatus(ETaskStatus.NONE);
      dispatch(removeTaskAction({ hash }));
    }
  }, [status, progress.taskStatus]);

  useEffect(() => {
    setStatus(progress.taskStatus);
  }, [progress.taskStatus]);

  const downloaded = progress.size > 0 ? Math.floor((100 * progress.downloaded) / progress.size) : 0;
  return (
    <EpisodeItem>
      {imagePreview && <ItemImage src={imagePreview} />}
      <Info>
        <Progress>
          {progress.taskStatus !== ETaskStatus.NONE && (
            <>
              <ProgressInfo>{downloaded}%</ProgressInfo>
              <Download completed={downloaded} />
            </>
          )}
        </Progress>
        <Details onClick={handleClick} allowClick={!isDownloadable} hasImage={!!imagePreview}>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </Details>
        {progress.size > 0 && <Size>{getSizeTitle(progress.size)}</Size>}
        {isDownloadable && (
          <>
            {status === ETaskStatus.LOADING && <StyledSpinner />}
            {status !== ETaskStatus.LOADING && (
              <Action status={progress.taskStatus} onClick={handleActionClick}>
                {progress.taskStatus === ETaskStatus.NONE && <DownloadIcon />}
                {[ETaskStatus.IDLE, ETaskStatus.IN_PROGRESS, ETaskStatus.READY].includes(progress.taskStatus) && (
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
