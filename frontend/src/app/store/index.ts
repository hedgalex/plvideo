import { configureStore } from '@reduxjs/toolkit';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { useDispatch } from 'react-redux';
import pageReducer, { IPage } from './pageSlice';

export interface IState {
  page: IPage;
}

export const store = configureStore({
  reducer: {
    page: pageReducer,
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
