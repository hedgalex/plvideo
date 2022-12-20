import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IPageShow } from '~shared/.ifaces';
import { EResource, EShowTypes } from '~shared/.consts';
import { Episode } from '~components/episode';
import { Episodes } from '../../../components/episodes';
import { IState, useAppDispatch } from '../../../store';
import { fetchShowAction } from '../../../store/pageSlice';
import { Loader } from '../../../styles';
import { Content, Header } from '../../styles';
import { ImageContainer, ShowContent, ShowData, ShowDescription, ShowImage, Year } from './styles';

export const ShowPage: React.FC = () => {
  const { resource = EResource.IMDB, resourceShowId = '' } = useParams();

  const dispatch = useAppDispatch();
  const { isLoading, data } = useSelector((state: IState) => state.page);
  const show = data as IPageShow;

  useEffect(() => {
    if (resource && resourceShowId) {
      dispatch(fetchShowAction({ resource, resourceShowId }));
    }
  }, [resource, resourceShowId]);

  return (
    <Content>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <Header variant="h1" fontSize="32px">
            {show?.title}
            <Year>{show?.year}</Year>
          </Header>

          <ShowContent>
            <ImageContainer>
              <ShowImage src={show?.image} alt="" />
            </ImageContainer>
            <ShowDescription>{show?.description}</ShowDescription>
          </ShowContent>
          <ShowData></ShowData>
          <Box pt="20px">
            {show?.type === EShowTypes.MOVIE && (
              <Episode resource={show.resource ?? EResource.IMDB} title="" type={EShowTypes.MOVIE} />
            )}
            {show?.type === EShowTypes.TVSHOW && (
              <Episodes
                seasons={show.seasons}
                episodes={show.episodes}
                resource={show.resource}
                allowDownload={show.resource !== EResource.IMDB}
                resourceShowId={show.resourceShowId}
              />
            )}
          </Box>
        </>
      )}
    </Content>
  );
};
