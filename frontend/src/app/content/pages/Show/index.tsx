import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

import { EResource, EShowTypes } from '~shared/.consts';
import { Episode } from '~app/components/episode/Episode';
import { Episodes } from '~components/episodes';
import { Content, PageContent } from '~app/content/styles';
import { useShow } from '~hooks/useShow';
import { MoreButton } from './components/MoreButton';
import { EditableTitle } from './components/EditableHeader';
import { ImageContainer, ShowContent, ShowDescription, ShowImage, ShowTitle, Year } from './styles';

export const ShowPage: React.FC = () => {
  const { id } = useParams();
  const { show, isLoading, previewImage, handleTitleUpdate, handleShowDelete, handleShowUpdate, handleShowChangeType } =
    useShow(id);

  return (
    <Content>
      <ShowTitle>
        <EditableTitle title={show?.title} onChange={handleTitleUpdate} />
        {!isLoading && (
          <Box mt="25px">
            <MoreButton
              lastUpdate={show.sync}
              resources={show.resources}
              onDelete={handleShowDelete}
              onUpdate={handleShowUpdate}
              onTypeChange={handleShowChangeType}
            />
          </Box>
        )}
      </ShowTitle>
      <Year>{show?.year}</Year>
      <PageContent>
        <ShowContent>
          <ImageContainer>{!isLoading && <ShowImage src={previewImage} alt="" />}</ImageContainer>
          <ShowDescription>{show?.description}</ShowDescription>
        </ShowContent>
        {!isLoading && (
          <Box pt="20px">
            {show?.type === EShowTypes.MOVIE && (
              <Episode
                id={show.id}
                showId={show.id}
                title={show?.title}
                subtitle={show?.year}
                resources={show?.resources}
                isDownloadable={show.resources.includes(EResource.ORORO) || show.resources.includes(EResource.AC)}
              />
            )}
            {show?.type === EShowTypes.TVSHOW && <Episodes episodes={show.episodes} />}
          </Box>
        )}
      </PageContent>
    </Content>
  );
};
