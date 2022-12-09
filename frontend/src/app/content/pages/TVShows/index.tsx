import { useSelector } from 'react-redux';
import { Content, Header } from '../../styles';
// import { Episode } from '../../../components/episode';
import { IState } from '../../../store';
import { Loader } from '../../../styles';

export const TVShowsPage: React.FC = () => {
  const { isLoading, data } = useSelector((state: IState) => state.page);
  console.info(isLoading, data);

  return (
    <Content>
      <Header variant="h1" fontSize="32px">
        Top TV Shows
      </Header>
      {isLoading && [...Array(3)].map((item, index) => <Loader key={`${index}${item}`} />)}
      {/* {!isLoading && <Episode />} */}
    </Content>
  );
};
