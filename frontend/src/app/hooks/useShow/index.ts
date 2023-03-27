import { useSelector } from 'react-redux';
import { IState, useAppDispatch } from '~store/index';
import { IPageShowInfo } from '~shared/.ifaces';
import { useCallback, useEffect, useState } from 'react';
import {
  fetchShowAction,
  saveShowTitleAction,
  updateShowAction,
  updateShowActionChangeType,
  updateShowActionDelete,
} from '~store/pageSlice';
import { EResource } from '~shared/.consts';
import { useNavigate } from 'react-router-dom';

// enum EShowAction {}

interface IUseShowProps {
  show: IPageShowInfo;
  isLoading: boolean;
  previewImage: string;
  handleTitleUpdate: (title: string) => void;
  handleShowUpdate: (resource: EResource) => void;
  handleShowDelete: () => void;
  handleShowChangeType: () => void;
}

export const useShow = (id = ''): IUseShowProps => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, data } = useSelector((state: IState) => state.page);
  const [previewImage, setPreviewImage] = useState<string>('');
  const show = data as IPageShowInfo;

  const handleTitleUpdate = useCallback(
    (title: string) => {
      if (id) {
        dispatch(saveShowTitleAction({ id, title }));
      }
    },
    [id],
  );

  const handleShowUpdate = useCallback(
    (resource: EResource) => {
      if (id) {
        dispatch(updateShowAction({ id, resource, force: true }));
      }
    },
    [id],
  );

  const handleShowDelete = useCallback(() => {
    if (id) {
      dispatch(updateShowActionDelete({ id }));
      navigate('/');
    }
  }, [id]);

  const handleShowChangeType = useCallback(() => {
    if (id) {
      dispatch(updateShowActionChangeType({ id }));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      dispatch(fetchShowAction({ id }));
    }
  }, [id]);

  useEffect(() => {
    if (show?.image) {
      setPreviewImage(`${show?.image}?${new Date().getTime()}`);
    }
  }, [show?.image]);

  return {
    show,
    previewImage,
    isLoading,
    handleTitleUpdate,
    handleShowUpdate,
    handleShowDelete,
    handleShowChangeType,
  };
};
