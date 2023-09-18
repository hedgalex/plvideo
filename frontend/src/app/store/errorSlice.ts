import { createSlice } from '@reduxjs/toolkit';

export interface IError {
  errors: string[];
}

const initialState = {
  errors: [],
} as IError;

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    addError: (state: IError, { payload }) => {
      state.errors = [...state.errors, payload];
    },
    clearErrors: (state: IError) => {
      state.errors = [];
    },
  },
});

export const { addError, clearErrors } = errorSlice.actions;
export default errorSlice.reducer;
