import DownloadIcon from '@mui/icons-material/Download';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ETaskStatus } from '~shared/.consts';
import { Action, StyledSpinner } from '../styles';

export interface IDownloadActionProps {
  status: ETaskStatus;
  onClick: () => void;
}

export const DownloadAction: React.FC<IDownloadActionProps> = ({ status, onClick }) => {
  return (
    <>
      {status === ETaskStatus.BUSY && <StyledSpinner />}
      {status !== ETaskStatus.BUSY && (
        <Action status={status} onClick={onClick}>
          {status === ETaskStatus.NONE && <DownloadIcon />}
          {[ETaskStatus.IDLE, ETaskStatus.IN_PROGRESS, ETaskStatus.READY].includes(status) && <DeleteOutlineIcon />}
        </Action>
      )}
    </>
  );
};
