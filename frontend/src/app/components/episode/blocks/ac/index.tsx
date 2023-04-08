import DownloadIcon from '@mui/icons-material/Download';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ETaskStatus } from '~shared/.consts';
import { Action, StyledSpinner } from '../../styles';

export interface IACDownloadButton {
  status: ETaskStatus;
  onAction: () => void;
}

export const ACDownloadButton: React.FC<IACDownloadButton> = ({ status, onAction }) => {
  return (
    <>
      {status === ETaskStatus.BUSY && <StyledSpinner />}
      {status !== ETaskStatus.BUSY && (
        <Action status={status} onClick={onAction}>
          {status === ETaskStatus.NONE && <DownloadIcon />}
          {[ETaskStatus.IDLE, ETaskStatus.IN_PROGRESS, ETaskStatus.READY].includes(status) && <DeleteOutlineIcon />}
        </Action>
      )}
    </>
  );
};
