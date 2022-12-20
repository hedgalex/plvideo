import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store';
import { getAllTasks } from '../store/tasksSlice';

export const TaskService: React.FC = () => {
  const dispatch = useAppDispatch();
  const [timer, setTimer] = useState<NodeJS.Timer>();

  useEffect(() => {
    if (!timer) {
      dispatch(getAllTasks());
      const interval = setInterval(() => {
        dispatch(getAllTasks());
      }, 5000);

      setTimer(interval);
    }
  }, [timer]);

  return <></>;
};
