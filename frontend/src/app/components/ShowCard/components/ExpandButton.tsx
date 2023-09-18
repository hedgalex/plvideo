import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ButtonContainer } from '../styles';

interface ExpandMoreButtonProps {
  isActive?: boolean;
  onClick: () => void;
}

export const ExpandMoreButton: React.FC<ExpandMoreButtonProps> = ({ onClick, isActive = false }) => {
  return (
    <ButtonContainer variant="primary" onClick={onClick} isActive={isActive}>
      <ExpandMoreIcon />
    </ButtonContainer>
  );
};
