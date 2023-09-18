import { useCallback } from 'react';
import { Box, Tooltip } from '@mui/material';
import { Rating } from '../Card/components/Rating';
import { Title } from '../Card/components/Title';
import { ExpandMoreButton } from './components/ExpandButton';
import { EShowTypes } from '~shared/.consts';
import { useShowPageNavigator } from '~app/hooks/useShowPageNavigator';
import { CardExtends } from '../Card/.iface/CardExtends';
import { Actions } from '../Card/styles';
import { SourcesRoller } from './components/SourcesRoller';
import { Attachment, AttachmentContent, CardStyled, ExpandingImage, RatingShift, Score, Year } from './styles';

export type ShowCardProps = CardExtends & {
  image?: string;
  title?: string;
  type?: EShowTypes;
  popularity?: number;
  popularityIncline?: number;
  votedImdb?: number;
  ratingImdb?: number;
  year?: number;
  isExpanded?: boolean;
  onExpand?: (id: number) => void;
};

export const ShowCard: React.FC<ShowCardProps> = ({
  id,
  image,
  title,
  type,
  popularity,
  popularityIncline = 0,
  votedImdb,
  ratingImdb,
  year,
  isExpanded = false,
  onExpand,
}) => {
  const { handleNavigate } = useShowPageNavigator(id);

  const handleExpandMoreClick = useCallback(() => {
    onExpand?.(id);
  }, [id]);

  return (
    <Box mb="20px">
      <CardStyled isSelected={isExpanded}>
        <Rating score={popularity} shift={popularityIncline} />
        <ExpandingImage src={image} isExpanding={isExpanded} />
        <Title text={title} subText={type === EShowTypes.TVSHOW ? 'TV Series' : 'Movie'} onClick={handleNavigate} />
        <Actions>
          <ExpandMoreButton onClick={handleExpandMoreClick} isActive={isExpanded} />
        </Actions>
      </CardStyled>
      <Attachment isVisible={isExpanded}>
        <Year>{year}</Year>
        <RatingShift score={Math.abs(popularityIncline)} shift={popularityIncline} />
        <Tooltip title={`Voted: ${votedImdb}`}>
          <Score>{ratingImdb?.toFixed(1)}</Score>
        </Tooltip>
        {isExpanded && (
          <AttachmentContent>
            <SourcesRoller cardId={id} />
          </AttachmentContent>
        )}
      </Attachment>
    </Box>
  );
};
