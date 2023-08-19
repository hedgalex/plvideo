import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { IState, useAppDispatch } from '~store/index';
import { searchAction } from '~store/pageSlice';
import { getHashParams } from '~components/episodes/utils';
import { IPageListResult, IShowItem } from '~shared/.ifaces';

interface IUseSearchPage {
  isLoading: boolean;
  items: IShowItem[];
  text: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const useSearchPage = (): IUseSearchPage => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { hash = '#' } = useLocation();
  const [text, setText] = useState<string>('');

  const { isLoading, data } = useSelector((state: IState) => state.page);
  const { items = [] } = data as IPageListResult<IShowItem>;

  const dispatchSearch = (searchText: string) => {
    setText(searchText);
    if (searchText.length > 2) {
      dispatch(searchAction({ searchText }));
    }
  };

  useEffect(() => {
    const { text: searchText = '' } = getHashParams(decodeURIComponent(hash));
    if (!text) {
      dispatchSearch(searchText);
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newText = event?.target?.value ?? '';
    dispatchSearch(newText);
    navigate(`#text=${encodeURIComponent(newText)}`);
  };

  return {
    isLoading,
    items,
    text,
    onChange: handleChange,
  };
};
