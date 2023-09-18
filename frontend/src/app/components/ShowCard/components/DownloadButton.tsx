import DownloadIcon from '@mui/icons-material/Download';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { ButtonContainer } from '../styles';
import { EStatus } from '~shared/.consts';

interface DownloadButtonProps {
  status?: EStatus;
  onClick: () => void;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick, status = EStatus.NONE }) => {
  if (status === EStatus.NONE) {
    return null;
  }

  return (
    <ButtonContainer variant="primary" onClick={onClick}>
      {[EStatus.STEADY].includes(status) && <DownloadIcon />}
      {[EStatus.IDLE].includes(status) && <HourglassEmptyIcon />}
      {[EStatus.BUSY, EStatus.IN_PROGRESS, EStatus.READY].includes(status) && <DownloadIcon />}
    </ButtonContainer>
  );
};
