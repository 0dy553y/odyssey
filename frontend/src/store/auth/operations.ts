import { History } from 'history';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { HOME_ROUTE, LOGIN_ROUTE } from 'routing/routes';
import { withStatusMessages } from 'utils/ui';
import api from '../../api';
import {
  LoginData,
  RegisterData,
  UserData,
  UserPutData,
} from '../../types/auth';
import { OperationResult } from '../../types/store';
import { RootState } from '../index';
import { resetAuth, setIsValidatingToken, setUser } from './actions';

export function login(loginData: LoginData, history: History): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    await withStatusMessages(dispatch, api.auth.login(loginData)).then(
      (response) => {
        const userData: UserData = response.payload.data;
        dispatch(setUser(userData));
        history.push(HOME_ROUTE);
      }
    );
  };
}

export function logout(history: History): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    await withStatusMessages(dispatch, api.auth.logout()).then(() => {
      // TODO: reset other store here as well
      dispatch(resetAuth());
      history.push(LOGIN_ROUTE);
    });
  };
}

export function registerUser(
  registerData: RegisterData,
  history: History
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    await withStatusMessages(
      dispatch,
      api.auth.registerUser(registerData)
    ).then(() => {
      dispatch(login({ ...registerData }, history));
    });
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
      .finally(() => dispatch(setIsValidatingToken(false)));
  };
}

export function updateUser(userPutData: UserPutData): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    await withStatusMessages(dispatch, api.auth.editUser(userPutData)).then(
      (resp) => {
        const userData: UserData = resp.payload.data;
        dispatch(setUser(userData));
      }
    );
  };
}
