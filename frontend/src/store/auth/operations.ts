import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import api from '../../api';
import { LoginData, RegisterData, UserData } from '../../types/auth';
import { OperationResult } from '../../types/store';
import { RootState } from '../index';
import { setUser } from './actions';

export function login(loginData: LoginData): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.auth.login(loginData);
    const userData: UserData = response.payload.data;
    dispatch(setUser(userData));
  };
}

export function registerUser(registerData: RegisterData): OperationResult {
  return async () => {
    await api.auth.registerUser(registerData);
  };
}
