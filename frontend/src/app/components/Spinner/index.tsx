import { SpinnerElement } from './styles';

interface SpinnerProps {
  isVisible?: boolean;
  size?: number;
  weight?: number;
}

export const Spinner: React.FC<SpinnerProps> = ({ isVisible = true, size = 25, weight = 2 }) => {
  if (!isVisible) return null;

  return <SpinnerElement size={size} weight={weight} />;
};
