import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IShowItem } from '~shared/.ifaces';

export interface IShow {
  data: IShowItem;
  isLoaded: boolean;
  isLoading: boolean;
  error?: string;
}

const data: IShowItem = {
  id: 6691293983816522,
  title: 'Wednesday',
  image: 'https://uploads.ororo-mirror.tv/uploads/show/poster/3053/thumb_z7TQV2AwI2bLYyQ68QHxfAPfaJZ.jpg',
  type: 1,
  year: 2022,
  popularity: 1,
  popularityIncline: 0,
  ratingImdb: 8.3,
  votedImdb: 166222,

  resources: [],
};

const initialState = {
  data: {},
  isLoaded: false,
  isLoading: false,
} as IShow;

export const getSourcesAction = createAsyncThunk(
  'show/sources',
  async ({ cardId, season, episode }: { cardId: number; season?: number; episode?: number }) => {
    const { data } = await axios.get(`/api/card/${cardId}/sources`, { params: { season, episode } });
    return data;
  },
);

export const getSourceAction = createAsyncThunk(
  'show/source',
  async ({ showId, sourceId }: { showId: number; sourceId: number }) => {
    const { data } = await axios.get(`/api/card/${showId}/source/${sourceId}`);
    return data;
  },
);

const showSlice = createSlice({
  name: 'show',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSourcesAction.fulfilled, (state: IShow, { payload }) => {
      state.data = payload;
      state.isLoaded = true;
      state.isLoading = false;
      state.error = undefined;
    });
    builder.addCase(getSourcesAction.pending, (state: IShow) => {
      state.isLoading = true;
    });
    builder.addCase(getSourcesAction.rejected, (state: IShow, { error }) => {
      state.data = data;
      state.isLoaded = true;
      state.isLoading = false;
      state.error = error?.message ?? 'Unknown error';
    });

    builder.addCase(getSourceAction.fulfilled, (state: IShow, { payload }) => {
      state.data = payload;
      state.isLoaded = true;
      state.isLoading = false;
      state.error = undefined;
    });
    builder.addCase(getSourceAction.pending, (state: IShow) => {
      state.isLoading = true;
    });
    builder.addCase(getSourceAction.rejected, (state: IShow, { error }) => {
      state.data = data;
      state.isLoaded = true;
      state.isLoading = false;
      state.error = error?.message ?? 'Unknown error';
    });
  },
});

export default showSlice.reducer;
