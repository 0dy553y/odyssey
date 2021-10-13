import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateSnackbarData, SnackbarKey, SnackbarsState } from './types';

const initialState: SnackbarsState = {
  nextSnackbarKey: 0,
  snackbars: [],
};

export const snackbarsSlice = createSlice({
  name: 'snackbars',
  initialState,
  reducers: {
    addSnackbar: (state, action: PayloadAction<CreateSnackbarData>): void => {
      state.snackbars.push({
        ...action.payload,
        key: state.nextSnackbarKey,
      });

      state.nextSnackbarKey += 1;
    },
    removeSnackbar: (state, action: PayloadAction<SnackbarKey>): void => {
      state.snackbars = state.snackbars.filter(
        (snackbar) => snackbar.key !== action.payload
      );
    },
    resetSnackbars: (state): void => {
      state.nextSnackbarKey = 0;
      state.snackbars = [];
    },
  },
});

export default snackbarsSlice.reducer;
