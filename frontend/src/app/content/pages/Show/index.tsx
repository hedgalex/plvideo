import { Box } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { IPageShowInfo } from '~shared/.ifaces';
import { EResource, EShowTypes } from '~shared/.consts';
import { Episode } from '~components/episode';
import { Episodes } from '~components/episodes';
import { IState, useAppDispatch } from '~store/index';
import { fetchShowAction, saveShowTitleAction, updateShowAction } from '~store/pageSlice';
import { Content, PageContent } from '~app/content/styles';
import { UpdateButton } from './components/UpdateButton';
import { EditableTitle } from './components/EditableHeader';
import { ImageContainer, ShowContent, ShowDescription, ShowImage, ShowTitle, Year } from './styles';

export const ShowPage: React.FC = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { isLoading, data } = useSelector((state: IState) => state.page);
  const show = data as IPageShowInfo;

  const handleSaveTitle = useCallback(
    (title: string) => {
      if (id) {
        dispatch(saveShowTitleAction({ id, title }));
      }
    },
    [id],
  );

  const handleUpdate = useCallback(
    (resource: EResource) => {
      if (id) {
        dispatch(updateShowAction({ id, resource, force: true }));
      }
    },
    [id],
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchShowAction({ id }));
    }
  }, [id]);

  //TODO Update picture
  return (
    <Content>
      <ShowTitle loading={isLoading}>
        <EditableTitle title={show?.title} onChange={handleSaveTitle} />
        {!isLoading && (
          <Box mt="25px">
            <UpdateButton lastUpdate={show.sync} resources={show.resources} onClick={handleUpdate} />
          </Box>
        )}
      </ShowTitle>
      <Year loading={isLoading}>{show?.year}</Year>
      <PageContent>
        <ShowContent>
          <ImageContainer loading={isLoading}>{!isLoading && <ShowImage src={show?.image} alt="" />}</ImageContainer>
          <ShowDescription loading={isLoading}>{show?.description}</ShowDescription>
        </ShowContent>
        {!isLoading && (
          <Box pt="20px">
            {show?.type === EShowTypes.MOVIE && (
              <Episode
                id={show.id}
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
