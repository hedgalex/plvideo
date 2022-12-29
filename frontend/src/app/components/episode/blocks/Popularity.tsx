import { Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { RatingIncline } from '../styles';

export interface IPopularityProps {
  value?: number;
  incline?: number;
}

export const Popularity: React.FC<IPopularityProps> = ({ value, incline = 0 }) => {
  if (!value) {
    <></>;
  }

  return (
    <Box display="flex" justifyContent="center">
      <Box pt="10px">{value}</Box>
      {incline === 0 && <Box width="24px" />}
      {incline > 0 && (
        <RatingIncline incline={incline}>
          <ArrowDropUpIcon />
          <Box fontSize="12px" fontWeight="bold" mt="-10px">
            {incline}
          </Box>
        </RatingIncline>
      )}
      {incline < 0 && (
        <RatingIncline incline={incline}>
          <Box fontSize="12px" fontWeight="bold">
            {-1 * incline}
          </Box>
          <Box mt="-8px">
            <ArrowDropDownIcon />
          </Box>
        </RatingIncline>
      )}
    </Box>
  );
};
