import { Box } from '@mui/material';
import { Content } from '~app/content/styles';
import { useShow } from '~app/hooks/useShow';
import { SeasonCard } from '~components/SeasonCard';
import { EpisodeCard } from '~components/EpisodeCard';
import { EditableTitle } from './components/EditableHeader';
import { ImageContainer, ShowContent, ShowDescription, ShowImage, ShowTitle, Year } from './styles';
import { ShowCardList } from '../../../components/ShowCardList';

export const ShowPage: React.FC = () => {
  const { show, seasons, episodes, selectedSeason, onSeasonChange, isLoading, previewImage } = useShow();
  return (
    <Content>
      <ShowTitle>
        <EditableTitle
          title={show?.title}
          onChange={() => {
            console.info('123');
          }}
        />
        {!isLoading && (
          <Box mt="25px">{/* <MoreButton lastUpdate={show.sync} onTypeChange={handleShowChangeType} /> */}</Box>
        )}
      </ShowTitle>
      <Year>{show?.year}</Year>
      <Box mt="70px">
        <ShowContent>
          <ImageContainer>{!isLoading && <ShowImage src={previewImage} alt="" />}</ImageContainer>
          <ShowDescription>{show?.description}</ShowDescription>
        </ShowContent>
        <Box mt="20px" />
        <SeasonCard
          id={show?.id}
          seasons={seasons}
          selectedSeason={selectedSeason}
          onSeasonChange={onSeasonChange}
          episodesCount={episodes?.length ?? 0}
        />
        <ShowCardList items={episodes} ItemComponent={EpisodeCard} />
      </Box>
    </Content>
  );
};
