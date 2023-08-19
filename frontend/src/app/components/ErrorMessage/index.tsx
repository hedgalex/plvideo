import WarningIcon from '@mui/icons-material/Warning';
import { ErrorMessageWrapper } from './styles';

interface ErrorMessageProps {
  isVisible?: boolean;
  message?: string;
  refetch?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ isVisible = false, message = '', refetch }) => {
  if (!isVisible) return null;

  return (
    <ErrorMessageWrapper>
      <WarningIcon
        onClick={() => {
          refetch?.();
        }}
      />
      <span>{message}</span>
      {refetch && <i>Click the icon to reload</i>}
    </ErrorMessageWrapper>
  );
};
