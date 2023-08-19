import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IPageContent, IPageShowInfo } from '~shared/.ifaces';
import { EShowTypes } from '~shared/.consts';
import { searchResult } from './mocks/shows';
import { tvShowsList } from './mocks/tvlist';
import { superNatural } from './mocks/supernatural';
import { downloads } from './mocks/downloads';

export interface IPage {
  data: IPageContent;
  isLoading: boolean;
}

const initialState = {
  data: {},
  isLoading: false,
} as IPage;

export const searchAction = createAsyncThunk('search/fetch', async ({ searchText }: { searchText: string }) => {
  const { data } = await axios.get(`/api/search`, { params: { searchText } });
  return data;
});

export const readTopAction = createAsyncThunk(
  'list/fetch',
  async ({ type, page }: { type: EShowTypes; page?: number }) => {
    const { data } = await axios.get(`/api/list`, { params: { type, page } });
    return data;
  },
);

export const readRecentAction = createAsyncThunk('list/recent', async () => {
  const { data } = await axios.get(`/api/recent`);
  return data;
});

export const fetchShowAction = createAsyncThunk('show/fetch', async ({ id }: { id: number | string }) => {
  const { data } = await axios.get('/api/details', { params: { id } });
  return data;
});

export const saveShowTitleAction = createAsyncThunk(
  'show/save',
  async ({ id, title }: { id: number | string; title: string }) => {
    const { data } = await axios.put('/api/details', { id, title });
    return data;
  },
);

export const addShowAction = createAsyncThunk(
  'show/add',
  async ({ resource, resourceShowId, showId }: { resource: string; resourceShowId: string; showId: number }) => {
    const { data } = await axios.post('/api/details/add', {
      resource,
      resourceShowId,
      showId: showId?.toString() ?? '0',
    });

    return data;
  },
);

export const updateShowActionChangeType = createAsyncThunk('show/type', async ({ id }: { id: number | string }) => {
  const { data } = await axios.post('/api/details/type', {
    id: id?.toString() ?? '0',
  });

  return data;
});

export const updateShowActionDelete = createAsyncThunk('show/delete', async ({ id }: { id: number | string }) => {
  const { data } = await axios.delete('/api/details', {
    data: { id: id?.toString() ?? '0' },
  });

  return data;
});

export const updateShowAction = createAsyncThunk(
  'show/update',
  async ({ id, resource, force }: { id: number | string; resource?: string; force?: boolean }) => {
    const { data } = await axios.post('/api/details/update', {
      resource,
      id: id?.toString() ?? '0',
      force,
    });

    return data;
  },
);

export const fetchDownloadsAction = createAsyncThunk(
  'downloads/fetch',
  async ({ showId }: { showId: number | string }) => {
    const { data } = await axios.get('/api/downloads', { params: { showId } });
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
      state.data = superNatural;
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
    builder.addCase(saveShowTitleAction.fulfilled, (state: IPage, { payload }) => {
      (state.data as IPageShowInfo).title = payload;
    });

    builder.addCase(readTopAction.fulfilled, (state: IPage, { payload }) => {
      state.data = payload;
    });
    builder.addCase(readTopAction.rejected, (state: IPage) => {
      state.data = tvShowsList;
    });

    builder.addCase(readRecentAction.fulfilled, (state: IPage, { payload }) => {
      state.data = payload;
    });
    builder.addCase(readRecentAction.rejected, (state: IPage) => {
      state.data = tvShowsList;
    });

    builder.addCase(updateShowAction.pending, (state: IPage) => {
      state.isLoading = true;
    });
    builder.addCase(updateShowAction.fulfilled, (state: IPage, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(updateShowAction.rejected, (state: IPage, { payload }) => {
      console.error('Error', payload);
      state.isLoading = false;
    });

    builder.addCase(updateShowActionChangeType.fulfilled, (state: IPage, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(updateShowActionChangeType.pending, (state: IPage) => {
      state.isLoading = true;
    });
    builder.addCase(updateShowActionChangeType.rejected, (state: IPage, { payload }) => {
      console.error('Error', payload);
      state.isLoading = false;
    });

    builder.addCase(updateShowActionDelete.fulfilled, (state: IPage, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(updateShowActionDelete.pending, (state: IPage) => {
      console.info(1);
      state.isLoading = true;
    });
    builder.addCase(updateShowActionDelete.rejected, (state: IPage, { payload }) => {
      console.error('Error', payload);
      state.isLoading = false;
    });

    builder.addCase(fetchDownloadsAction.pending, (state: IPage) => {
      console.info(1);
      state.isLoading = true;
    });
    builder.addCase(fetchDownloadsAction.fulfilled, (state: IPage, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(fetchDownloadsAction.rejected, (state: IPage) => {
      state.isLoading = false;
      state.data = downloads;
    });
  },
});

export default pageSlice.reducer;
