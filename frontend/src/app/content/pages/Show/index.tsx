import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IPageShowInfo } from '~shared/.ifaces';
import { EShowTypes } from '~shared/.consts';
import { Episode } from '~components/episode';
import { Episodes } from '~components/episodes';
import { IState, useAppDispatch } from '~store/index';
import { fetchShowAction } from '~store/pageSlice';
import { Loader } from '../../../styles';
import { Content, Header } from '../../styles';
import { ImageContainer, ShowContent, ShowData, ShowDescription, ShowImage, Year } from './styles';

export const ShowPage: React.FC = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { isLoading, data } = useSelector((state: IState) => state.page);
  const show = data as IPageShowInfo;

  useEffect(() => {
    if (id) {
      dispatch(fetchShowAction({ id }));
    }
  }, [id]);

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
            {show?.type === EShowTypes.MOVIE && <Episode id={0} title="" subtitle="" isDownloadable />}
            {show?.type === EShowTypes.TVSHOW && <Episodes episodes={show.episodes} />}
          </Box>
        </>
      )}
    </Content>
  );
};
