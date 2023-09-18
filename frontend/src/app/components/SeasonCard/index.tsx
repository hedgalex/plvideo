import { useCallback, useState } from 'react';
import { Box } from '@mui/material';
import { ExpandMoreButton } from '~components/ShowCard/components/ExpandButton';
import { SeasonPicker } from './SeasonPicker';
import { CardExtends } from '../Card/.iface/CardExtends';
import { Attachment, CardStyled } from '../ShowCard/styles';
import { Actions } from '../Card/styles';
import { AttachmentContent } from './styles';

export type SeasonCardProps = CardExtends & {
  seasons?: number[];
  selectedSeason?: number;
  onSeasonChange?: (season: number) => void;
  episodesCount?: number;
};

export const SeasonCard: React.FC<SeasonCardProps> = ({
  seasons = [],
  selectedSeason = 0,
  onSeasonChange,
  episodesCount,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleExpandMoreClick = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <Box mb="20px">
      <CardStyled isSelected={isExpanded}>
        <SeasonPicker
          seasons={seasons}
          episodesCount={episodesCount}
          currentSeason={selectedSeason}
          onChange={onSeasonChange}
        />
        <Actions>
          <ExpandMoreButton onClick={handleExpandMoreClick} isActive={isExpanded} />
        </Actions>
      </CardStyled>
      <Attachment isVisible={isExpanded}>{isExpanded && <AttachmentContent>1312</AttachmentContent>}</Attachment>
    </Box>
  );
};
