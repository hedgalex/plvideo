import { useSelector } from 'react-redux';
import { EResource, ETaskStatus } from '~shared/.consts';
import { ITask } from '~shared/.ifaces';
import { IState } from '../store';

interface IUseProgress {
  enabled?: boolean;
}

const defaultTask = {
  id: 0,
  hash: 0,
  started: 0,
  finished: 0,
  size: 0,
  downloaded: 0,
  resource: EResource.IMDB,
  taskStatus: ETaskStatus.NONE,
  title: '',
  subtitle: '',
  image: '',
};

export const useProgress = (hash: number, { enabled = true }: IUseProgress): ITask => {
  const { isLoaded, data } = useSelector((state: IState) => state.tasks);
  const tasks = data as ITask[];

  if (!enabled || !isLoaded || !tasks) {
    return defaultTask;
  }

  const found = tasks.find((task) => task.hash === hash);
  return found || defaultTask;
};
