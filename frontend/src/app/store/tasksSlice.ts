import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { EResource } from '~shared/.consts';
import { tasks } from './mocks/tasks';

export interface ITasks {
  data: [];
  isLoaded: boolean;
}

const initialState = {
  data: [],
  isLoaded: false,
} as ITasks;

export const getAllTasks = createAsyncThunk('tasks/fetch', async () => {
  const { data } = await axios.get(`/api/tasks`);
  return data;
});

export const addTaskAction = createAsyncThunk(
  'tasks/add',
  async ({
    resource,
    resourceShowId,
    resourceEpisodeId = '',
  }: {
    resource: EResource;
    resourceShowId: string;
    resourceEpisodeId?: string;
  }) => {
    const { data } = await axios.put(`/api/tasks`, { resource, resourceShowId, resourceEpisodeId });
    return data;
  },
);

export const removeTaskAction = createAsyncThunk('tasks/remove', async ({ hash }: { hash: number }) => {
  const { data } = await axios.delete(`/api/tasks`, { params: { hash } });
  return data;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTasks.fulfilled, (state: ITasks, { payload }) => {
      state.data = payload;
      state.isLoaded = true;
    });
    builder.addCase(getAllTasks.rejected, (state: ITasks) => {
      state.data = tasks as any;
      state.isLoaded = true;
    });
    builder.addCase(addTaskAction.fulfilled, (state: ITasks, { payload }) => {
      state.data = payload.data;
    });
    builder.addCase(removeTaskAction.fulfilled, (state: ITasks, { payload }) => {
      state.data = payload;
    });
  },
});

export default tasksSlice.reducer;
