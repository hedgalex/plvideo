import DownloadIcon from '@mui/icons-material/Download';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { EStatus } from '~shared/.consts';
import { Action, StyledSpinner } from '../styles';

export interface IDownloadActionProps {
  status: EStatus;
  onClick: () => void;
}

export const DownloadAction: React.FC<IDownloadActionProps> = ({ status, onClick }) => {
  return (
    <>
      {status === EStatus.BUSY && <StyledSpinner />}
      {status !== EStatus.BUSY && (
        <Action status={status} onClick={onClick}>
          {status === EStatus.NONE && <DownloadIcon />}
          {[EStatus.IDLE, EStatus.IN_PROGRESS, EStatus.READY].includes(status) && <DeleteOutlineIcon />}
        </Action>
      )}
    </>
  );
};
