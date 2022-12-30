import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { EResource } from '~shared/.consts';
import { tasks2 } from './mocks/tasks';

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
  async ({ id, resource }: { id: number; resource?: EResource }) => {
    const { data } = await axios.put(`/api/tasks`, { id, resource });
    return data;
  },
);

export const removeTaskAction = createAsyncThunk('tasks/remove', async ({ id }: { id: number }) => {
  const { data } = await axios.delete(`/api/tasks`, { params: { id } });
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
      state.data = tasks2 as any;
      state.isLoaded = true;
    });
  },
});

export default tasksSlice.reducer;
