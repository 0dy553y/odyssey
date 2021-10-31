import { authSlice } from './reducer';

export const {
  setUser,
  setIsValidatingToken,
  resetAuth,
  setRedirectUrl,
  resetRedirectUrl,
} = authSlice.actions;
