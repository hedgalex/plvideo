import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IState, useAppDispatch } from '~store/index';
import { readTopAction } from '~store/pageSlice';
import { EShowTypes } from '~shared/.consts';
import { IPageListResult, IShowItem } from '~shared/.ifaces';

interface IUseShowPage {
  isLoading: boolean;
  title: string;
  items: IShowItem[];
}

export const useShowPage = (type: EShowTypes): IUseShowPage => {
  const dispatch = useAppDispatch();
  const { isLoading, data } = useSelector((state: IState) => state.page);
  const { items = [] } = data as IPageListResult<IShowItem>;

  const [list, setList] = useState<IShowItem[]>();
  const [page] = useState<number>(1);

  const title = type === EShowTypes.TVSHOW ? 'Top TV Shows' : 'Top Movies';

  useEffect(() => {
    setList([...(list ?? []), ...items]);
  }, [items]);

  useEffect(() => {
    if (!list) {
      dispatch(readTopAction({ type, page }));
    }
  }, [list, page]);

  return {
    isLoading,
    title,
    items: list ?? [],
  };
};
