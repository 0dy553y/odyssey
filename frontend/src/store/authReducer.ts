import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '.';

// Define a type for the slice state
interface AuthState {
  accessToken?: string;
}

// Define the initial state using that type
const initialState: AuthState = {
  accessToken: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (
      state,
      action: PayloadAction<{ accessToken: string }>
    ): void => {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { setAccessToken } = authSlice.actions;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export default authSlice.reducer;
