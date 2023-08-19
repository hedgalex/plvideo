import { PropsWithChildren } from 'react';
import { Score, AdditionalStatsWrapper } from './styles';
import { Tooltip } from '@mui/material';
import { Stats } from './Stats';

interface AdditionalStatsProps {
  voted?: number;
  shift?: number;
  rating?: number;
}

export const AdditionalStats: React.FC<PropsWithChildren<AdditionalStatsProps>> = ({
  shift = 0,
  voted = 0,
  rating = 0,
}) => {
  return (
    <AdditionalStatsWrapper>
      <Stats score={Math.abs(shift)} shift={shift} type="additional" />
      {rating > 0 && (
        <Tooltip title={`Voted: ${voted}`}>
          <Score mr="5px">{rating.toFixed(1)}</Score>
        </Tooltip>
      )}
    </AdditionalStatsWrapper>
  );
};
