import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IState, useAppDispatch } from '~store/index';
import { readRecentAction } from '~store/pageSlice';
import { IListResult, IShowItem } from '~shared/.ifaces';
import { Episode } from '~app/components/episode/Episode';
import { ProgressLoader } from '~app/styles';
import { Content, Header } from '~app/content/styles';

export const Recent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, data } = useSelector((state: IState) => state.page);
  const { items = [] } = data as IListResult<IShowItem>;
  const [list, setList] = useState<IShowItem[]>();

  useEffect(() => {
    setList([...(list ?? []), ...items]);
  }, [items]);

  useEffect(() => {
    if (!list) {
      dispatch(readRecentAction());
    }
  }, [list]);

  return (
    <Content>
      <Header variant="h1">Recent</Header>
      <ProgressLoader loading={isLoading}>
        {!isLoading &&
          list?.map((item) => (
            <Episode
              key={item.id}
              id={item.id}
              showId={item.id}
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
      </ProgressLoader>
    </Content>
  );
};
