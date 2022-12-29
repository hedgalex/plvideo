import { SizeBlock } from '../styles';
import { getSizeTitle } from '../utils';

export interface ISizeProps {
  value?: number;
}

export const Size: React.FC<ISizeProps> = ({ value }) => {
  if (!value) {
    return <></>;
  }

  return <SizeBlock>{getSizeTitle(value)}</SizeBlock>;
};
