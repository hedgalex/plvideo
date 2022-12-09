import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IPageContent } from '~shared/.ifaces';
import { EServices } from '~shared/.consts';
import { searchResult, showData } from './mocks/shows';

export interface IPage {
  data: IPageContent;
  isLoading: boolean;
}

const initialState = {
  data: {},
  isLoading: false,
} as IPage;

export const searchAction = createAsyncThunk(
  'search/fetch',
  async ({ searchText, service }: { searchText: string; service: EServices }) =>
    axios.get(`/api/search`, { params: { searchText, service } }),
);

export const retriveShowAction = createAsyncThunk(
  'show/fetch',
  async ({ service, showId }: { service: string; showId: string }) =>
    axios.get(`/api/show`, { params: { service, showId } }),
);

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {},
  extraReducers: {
    'show/fetch/pending': (state: IPage) => {
      state.isLoading = true;
    },
    'show/fetch/fulfilled': (state: IPage, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    },
    'show/fetch/rejected': (state: IPage) => {
      state.isLoading = false;
      state.data = showData;
    },
    'search/fetch/pending': (state: IPage) => {
      state.isLoading = true;
    },
    'search/fetch/fulfilled': (state: IPage, { payload }) => {
      state.data = payload?.data;
      state.isLoading = false;
    },
    'search/fetch/rejected': (state: IPage) => {
      state.data = {
        page: 1,
        items: searchResult,
      };
      state.isLoading = false;
    },
  },
});

export default pageSlice.reducer;
