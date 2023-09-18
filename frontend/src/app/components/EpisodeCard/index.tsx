import { Box } from '@mui/material';
import { ExpandMoreButton } from '~components/ShowCard/components/ExpandButton';
import { Actions } from '../Card/styles';
import { Attachment, CardStyled } from '../ShowCard/styles';
import { EpisodeCardProps, useEpisode } from './useEpisode';
import { AttachmentContent, Title } from './styles';
import { SourcesRoller } from '../ShowCard/components/SourcesRoller';
import { DownloadButton } from '../ShowCard/components/DownloadButton';

export const EpisodeCard: React.FC<EpisodeCardProps> = (props: EpisodeCardProps) => {
  const { id, status, text, subText, isExpanded, handleExpandMoreClick, handleDownloadClick, handleSelectFiles } =
    useEpisode(props);
  return (
    <Box mb="20px">
      <CardStyled isSelected={isExpanded}>
        <Title text={text} subText={subText} />
        <Actions>
          <DownloadButton onClick={handleDownloadClick} status={status} />
          <ExpandMoreButton onClick={handleExpandMoreClick} isActive={isExpanded} />
        </Actions>
      </CardStyled>
      <Attachment isVisible={isExpanded}>
        {isExpanded && (
          <AttachmentContent>
            <SourcesRoller cardId={id} onSelectFiles={handleSelectFiles} />
          </AttachmentContent>
        )}
      </Attachment>
    </Box>
  );
};
