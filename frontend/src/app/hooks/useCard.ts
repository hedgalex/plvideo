import { useCallback, useEffect, useState } from 'react';
import { EStatus } from '~shared/.consts';
import { useCardDownloadMutation } from '../queries/useCardDownloadMutation';
import { useAppDispatch } from '../store';
import { addError } from '../store/errorSlice';

export interface UseCardResult {
  status: EStatus;

  handleSelectFiles: (sourceId: number, fileIds: number[]) => void;
  handleDownloadClick: () => void;
}

export const useCard = (id: number): UseCardResult => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<EStatus>(EStatus.NONE);
  const [sourceId, setSourceId] = useState<number>(0);
  const [fileIds, setFileIds] = useState<number[]>([]);
  const { mutate: addToDownloads, error } = useCardDownloadMutation();

  const handleSelectFiles = useCallback(
    (sourceId: number, fileIds: number[]) => {
      if (id && sourceId) {
        setSourceId(sourceId);

        if (fileIds.length > 0) {
          setStatus(EStatus.STEADY);
        } else {
          setStatus(EStatus.NONE);
        }

        setFileIds(fileIds);
      }
    },
    [id],
  );

  const handleDownloadClick = useCallback(() => {
    switch (status) {
      case EStatus.STEADY:
        setStatus(EStatus.IDLE);
        addToDownloads({ id, sourceId, fileIds });
        break;
      default:
        break;
    }
  }, [id, sourceId, status, fileIds]);

  useEffect(() => {
    const message = (error as Error)?.message;
    if (message) {
      dispatch(addError(message));
      setStatus(EStatus.STEADY);
    }
  }, [error]);

  return {
    status,
    handleSelectFiles,
    handleDownloadClick,
  };
};
