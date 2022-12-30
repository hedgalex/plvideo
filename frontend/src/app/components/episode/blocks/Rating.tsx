import { Box } from '@mui/material';
import { RatingBlock } from '../styles';
export interface IRatingProps {
  value?: number;
  voted?: number;
}

export const Rating: React.FC<IRatingProps> = ({ value, voted }) => {
  if (!value || !voted) {
    return <></>;
  }

  return (
    <RatingBlock>
      <Box>{value}/10</Box>
      <Box>{voted}</Box>
    </RatingBlock>
  );
};
