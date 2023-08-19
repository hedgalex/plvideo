import { configureStore } from '@reduxjs/toolkit';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { useDispatch } from 'react-redux';
import pageReducer, { IPage } from './pageSlice';
import tasksReducer, { ITasks } from './tasksSlice';
import showReducer, { IShow } from './showSlice';

export interface IState {
  page: IPage;
  tasks: ITasks;
  show: IShow;
}

export const store = configureStore({
  reducer: {
    page: pageReducer,
    tasks: tasksReducer,
    show: showReducer,
  },
  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware<unknown>) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {},
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
