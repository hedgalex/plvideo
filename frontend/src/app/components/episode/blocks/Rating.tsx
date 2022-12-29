import { Box } from '@mui/material';

export interface IRatingProps {
  value?: number;
  voted?: number;
}

export const Rating: React.FC<IRatingProps> = ({ value, voted }) => {
  if (!value || !voted) {
    return <></>;
  }

  return (
    <Box width="100px" textAlign="center" fontSize="14px" pt="6px">
      <Box>{value}/10</Box>
      <Box>{voted}</Box>
    </Box>
  );
};
