import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IPageContent } from '~shared/.ifaces';
import { EResource } from '~shared/.consts';
import { searchResult } from './mocks/shows';
import { rickAndMortyShow } from './mocks/ororo-rick-and-morty';

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
  async ({ searchText, resource }: { searchText: string; resource: EResource }) => {
    const { data } = await axios.get(`/api/search`, { params: { searchText, resource } });
    return data;
  },
);

export const fetchShowAction = createAsyncThunk(
  'show/fetch',
  async ({ resource, resourceShowId }: { resource: string; resourceShowId: string }) => {
    const { data } = await axios.get(`/api/details`, { params: { resource, resourceShowId } });
    return data;
  },
);

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShowAction.pending, (state: IPage) => {
      state.isLoading = true;
    });
    builder.addCase(fetchShowAction.fulfilled, (state: IPage, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(fetchShowAction.rejected, (state: IPage) => {
      state.isLoading = false;
      state.data = rickAndMortyShow;
    });
    builder.addCase(searchAction.pending, (state: IPage) => {
      state.isLoading = true;
    });
    builder.addCase(searchAction.fulfilled, (state: IPage, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(searchAction.rejected, (state: IPage) => {
      state.data = {
        page: 1,
        items: searchResult,
      };
      state.isLoading = false;
    });
  },
});

export default pageSlice.reducer;
