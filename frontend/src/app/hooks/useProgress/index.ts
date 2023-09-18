import { useCallback, useEffect, useState } from 'react';
import { EResource, EStatus } from '~shared/.consts';
import { useAppDispatch } from '~store/index';
import { addTaskAction, removeTaskAction } from '~store/tasksSlice';
import { IUseProgress } from './.ifaces/IUseProgress';
import { IUseProgressResult } from './.ifaces/IUseProgressResult';
import { useTaskSelector } from './.consts';

export const useProgress = (id: number, { enabled = true }: IUseProgress): IUseProgressResult => {
  const dispatch = useAppDispatch();
  const task = useTaskSelector(id, { enabled });
  const [status, setStatus] = useState<EStatus>(task.taskStatus);

  const changeStatus = useCallback(
    async (resource?: EResource) => {
      if (status === EStatus.BUSY || !id || !resource) {
        return;
      }
      if (status === EStatus.NONE) {
        dispatch(addTaskAction({ id, resource }));
        setStatus(EStatus.BUSY);
      }

      if ([EStatus.IN_PROGRESS, EStatus.READY].includes(status)) {
        await dispatch(removeTaskAction({ id }));
        setStatus(EStatus.NONE);
      }
    },
    [status],
  );

  // const handleAction = useCallback(async () => {}, []);

  useEffect(() => {
    setStatus(task.taskStatus);
  }, [task.taskStatus]);

  const size = task.size;
  const downloaded = size > 0 ? Math.floor((100 * task.downloaded) / size) : 0;

  return {
    size,
    downloaded,
    started: task.started,
    finished: task.finished,
    resource: task.resource,
    changeStatus,
    status,
    error: task.error,
    errorTime: task.errorTime,
  };
};
