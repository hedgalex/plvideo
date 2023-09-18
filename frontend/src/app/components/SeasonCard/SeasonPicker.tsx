import { useState } from 'react';
import { Container, Season, StyledPopover, Title } from './styles';

export type SeasonPickerProps = {
  seasons?: number[];
  currentSeason?: number;
  episodesCount?: number;
  onChange?: (id: number) => void;
};

export const SeasonPicker: React.FC<SeasonPickerProps> = ({
  seasons = [],
  episodesCount = 0,
  currentSeason,
  onChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSeasonClick = (season: number) => {
    onChange?.(season);
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? 'season-picker' : undefined;

  return (
    <>
      <Title text={`Season ${currentSeason ?? 1}`} subText={`Episodes ${episodesCount}`} onClick={handleClick} />
      <StyledPopover
        id={id}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Container>
          {seasons.map((season) => (
            <Season
              key={season}
              isSelected={season === currentSeason}
              onClick={() => {
                handleSeasonClick(season);
              }}
            >
              Season {season}
            </Season>
          ))}
        </Container>
      </StyledPopover>
    </>
  );
};
