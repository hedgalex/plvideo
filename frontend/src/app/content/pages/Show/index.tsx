import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IPageShow } from '~shared/.ifaces';
import { IState, useAppDispatch } from '../../../store';
import { retriveShowAction } from '../../../store/pageSlice';
import { Loader } from '../../../styles';
import { Content, Header } from '../../styles';
import { ShowContent, ShowData, ShowDescription, ShowImage, Year } from './styles';

export const ShowPage: React.FC = () => {
  const { service = 'imdb', showId = '' } = useParams();
  const dispatch = useAppDispatch();
  const { isLoading, data } = useSelector((state: IState) => state.page);
  const show = data as IPageShow;

  useEffect(() => {
    if (service && showId) {
      dispatch(retriveShowAction({ service, showId }));
    }
  }, [service, showId]);

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
            <ShowImage src={show?.imagePreview} alt="" />
            <ShowDescription>{show?.description}</ShowDescription>
          </ShowContent>
          <ShowData></ShowData>
        </>
      )}
    </Content>
  );
};
