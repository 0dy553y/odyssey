import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../types/auth';
import { AuthState } from './types';

const initialState: AuthState = {
  user: undefined,
  isValidatingToken: true,
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
  },
});

export default authSlice.reducer;
