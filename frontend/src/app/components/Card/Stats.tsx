import { PropsWithChildren } from 'react';
import { ArrowDown, ArrowUp, Score, StatContainer } from './styles';

export interface StatProps {
  score?: number;
  shift?: number;
  type?: 'default' | 'additional';
}

export const Stats: React.FC<PropsWithChildren<StatProps>> = ({ score = 0, shift = -1, type = 'default' }) => {
  return (
    <StatContainer isVisible={score > 0 && score < 999} type={type}>
      <ArrowUp shift={shift} type={type === 'additional' ? 'aside' : 'above'} />
      <Score>{score}</Score>
      <ArrowDown shift={shift} type={type === 'additional' ? 'aside' : 'under'} />
    </StatContainer>
  );
};
