import { Tooltip } from '@mui/material';
import { PopularityBlock } from '../styles';

export interface IPopularityProps {
  value?: number;
  incline?: number;
}

export const Popularity: React.FC<IPopularityProps> = ({ value, incline = 0 }) => {
  if (!value) {
    <></>;
  }

  return (
    <Tooltip title={Math.abs(incline)}>
      <PopularityBlock incline={incline}>{value}</PopularityBlock>
    </Tooltip>
  );
};
