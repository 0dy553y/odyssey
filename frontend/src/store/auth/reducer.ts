import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../types/auth';
import { AuthState } from './types';

const initialState: AuthState = {
  user: undefined,
  isValidatingToken: true,
  redirectUrl: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>): void => {
      state.user = action.payload;
    },
    setIsValidatingToken: (state, action: PayloadAction<boolean>): void => {
      state.isValidatingToken = action.payload;
    },
    resetAuth: (state): void => {
      // Note: not resetting isValidatingToken here because it should not need to be reset
      state.user = undefined;
    },
    setRedirectUrl: (state, action: PayloadAction<string>): void => {
      state.redirectUrl = action.payload;
    },
    resetRedirectUrl: (state): void => {
      state.redirectUrl = null;
    },
  },
});

export default authSlice.reducer;
