import DownloadIcon from '@mui/icons-material/Download';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { EStatus } from '~shared/.consts';
import { Action, StyledSpinner } from '../../styles';

export interface IACDownloadButton {
  status: EStatus;
  onAction: () => void;
}

export const ACDownloadButton: React.FC<IACDownloadButton> = ({ status, onAction }) => {
  return (
    <>
      {status === EStatus.BUSY && <StyledSpinner />}
      {status !== EStatus.BUSY && (
        <Action status={status} onClick={onAction}>
          {status === EStatus.NONE && <DownloadIcon />}
          {[EStatus.IDLE, EStatus.IN_PROGRESS, EStatus.READY].includes(status) && <DeleteOutlineIcon />}
        </Action>
      )}
    </>
  );
};
