import { History } from 'history';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import api from '../../api';
import { HOME_ROUTE } from '../../routing/routes';
import { LoginData, RegisterData, UserData } from '../../types/auth';
import { OperationResult } from '../../types/store';
import { RootState } from '../index';
import { setIsValidatingToken, setUser } from './actions';

export function login(loginData: LoginData, history: History): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.auth.login(loginData).catch((e: Error) => {
      // TODO: better error handling
      return Promise.reject(e);
    });
    const userData: UserData = response.payload.data;
    dispatch(setUser(userData));
    history.push(HOME_ROUTE);
  };
}

export function registerUser(
  registerData: RegisterData,
  history: History
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    await api.auth.registerUser(registerData).catch((e: Error) => {
      // TODO: better error handling
      return Promise.reject(e);
    });

    dispatch(login({ ...registerData }, history));
  };
}

export function validateToken(): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    await api.auth
      .validateToken()
      .then((resp) => {
        const userData: UserData = resp.payload.data;
        dispatch(setUser(userData));
      })
      .catch((e: Error) => {
        // TODO: better error handling
        console.error(e);
      });

    dispatch(setIsValidatingToken(false));
  };
}
