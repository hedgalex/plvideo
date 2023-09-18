import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { IState, useAppDispatch } from '~store/index';
import { getHashParams } from '~components/episodes/utils';
import { IDownload, IListResult } from '~shared/.ifaces';
import { fetchDownloadsAction } from '../store/pageSlice';

interface IUseDownloads {
  isLoading: boolean;
  groups: IDownload[];
  onShowChange: (showId: number) => void;
}

export const useDownloads = (): IUseDownloads => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { hash = '#' } = useLocation();
  const { isLoading, data } = useSelector((state: IState) => state.page);

  const downloadList = (data as IListResult<IDownload>)?.items;
  const { show = '0' } = getHashParams(decodeURIComponent(hash));
  const showId = parseInt(show) ?? 0;

  useEffect(() => {
    dispatch(fetchDownloadsAction({ showId }));
  }, [showId]);

  const handleShowChange = (showId: number) => {
    navigate(`#show=${showId}`);
  };

  return {
    isLoading,
    groups: downloadList,
    onShowChange: handleShowChange,
  };
};
