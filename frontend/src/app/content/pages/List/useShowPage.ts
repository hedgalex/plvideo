import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IState, useAppDispatch } from '~store/index';
import { readTopAction } from '~store/pageSlice';
import { EShowTypes } from '~shared/.consts';
import { IListResult, IShowItem } from '~shared/.ifaces';
import { useNavigate } from 'react-router-dom';

interface IUseShowPage {
  isLoading: boolean;
  title: string;
  items: IShowItem[];
  handleTitleClick: (id: number) => void;
}

export const useShowPage = (type: EShowTypes): IUseShowPage => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, data } = useSelector((state: IState) => state.page);
  const { items = [] } = data as IListResult<IShowItem>;

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

  const handleTitleClick = useCallback(
    (id: number) => {
      navigate(`/show/${id}`);
    },
    [navigate],
  );

  return {
    isLoading,
    title,
    items: list ?? [],
    handleTitleClick,
  };
};
