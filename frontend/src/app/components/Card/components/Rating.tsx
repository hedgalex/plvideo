import { RatingStyles } from '../styles';

interface RatingProps {
  score?: number;
  shift?: number;
  className?: string;
}

const { Container, ArrowUp, ArrowDown, Score } = RatingStyles;

export const Rating: React.FC<RatingProps> = ({ score = -1, shift = 0, className }) => {
  return (
    <Container isVisible={score > -1 && score < 9999} className={className}>
      <ArrowUp shift={shift} />
      <Score>{score}</Score>
      <ArrowDown shift={shift} />
    </Container>
  );
};
