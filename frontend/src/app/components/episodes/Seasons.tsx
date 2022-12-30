import { Box } from '@mui/material';
import { ISeason } from './utils';
import { SeasonButton, SeasonsTitle } from './styles';

export interface ISeasonsProps {
  current: number;
  list?: ISeason[];
  onChange: (seasonNumber: number) => () => void;
}

export const Seasons: React.FC<ISeasonsProps> = ({ current, list = [], onChange }) => {
  if (list.length < 1) {
    return <></>;
  }

  return (
    <Box display="flex" p="10px 0 20px 0">
      <SeasonsTitle>Seasons:</SeasonsTitle>
      <Box display="flex" flexWrap="wrap">
        {list.map((season) => (
          <SeasonButton
            key={season.seasonNumber}
            variant="outlined"
            className="season-button"
            isSelected={season.seasonNumber === current}
            onClick={onChange(season.seasonNumber)}
          >
            {season.name}
          </SeasonButton>
        ))}
      </Box>
    </Box>
  );
};
