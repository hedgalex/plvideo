import { useSelector } from 'react-redux';
import { EResource, EStatus } from '~shared/.consts';
import { IState } from '~store/index';
import { ITask } from '~shared/.ifaces';

const defaultTask = {
  id: 0,
  hash: 0,
  started: 0,
  finished: 0,
  size: 0,
  downloaded: 0,
  resource: EResource.IMDB,
  taskStatus: EStatus.NONE,
  title: '',
  subtitle: '',
  image: '',
};

export const useTaskSelector = (id: number, { enabled = false }) =>
  useSelector((store: IState): ITask => {
    if (!enabled) {
      return defaultTask;
    }

    return store?.tasks?.data?.find((task: ITask) => task.id === id) ?? defaultTask;
  });