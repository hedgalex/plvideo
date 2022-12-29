import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IState, useAppDispatch } from '~store/index';
import { readTopAction } from '~store/pageSlice';
import { EShowTypes } from '~shared/.consts';
import { IPageListResult, IShowItem } from '~shared/.ifaces';
import { Episode } from '~components/episode';
import { Loader } from '../../../styles';
import { Content, Header } from '../../styles';

interface IListPageProps {
  type: EShowTypes;
}

export const ListPage: React.FC<IListPageProps> = ({ type }) => {
  const dispatch = useAppDispatch();
  const { isLoading, data } = useSelector((state: IState) => state.page);
  const { items = [] } = data as IPageListResult<IShowItem>;

  const [list, setList] = useState<IShowItem[]>();
  const [page] = useState<number>(1);

  const headTitle = type === EShowTypes.TVSHOW ? 'Top TV Shows' : 'Top Movies';

  useEffect(() => {
    setList([...(list ?? []), ...items]);
  }, [items]);

  useEffect(() => {
    if (!list) {
      dispatch(readTopAction({ type, page }));
    }
  }, [list, page]);

  return (
    <Content>
      <Header variant="h1" pb="72px">
        {headTitle}
      </Header>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          {list?.map((item) => (
            <Episode
              key={item.id}
              id={item.id}
              image={item.image}
              resources={item.resources}
              title={item.title}
              subtitle={item.year}
              popularity={item.popularity}
              popularityIncline={item.popularityIncline}
              ratingImdb={item.ratingImdb}
              votedImdb={item.votedImdb}
            />
          ))}
        </>
      )}
    </Content>
  );
};
