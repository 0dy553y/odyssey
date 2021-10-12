import { History } from 'history';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { withStatusMessages } from 'utils/ui';
import api from '../../api';
import { HOME_ROUTE } from '../../routing/routes';
import { LoginData, RegisterData, UserData } from '../../types/auth';
import { OperationResult } from '../../types/store';
import { RootState } from '../index';
import { setIsValidatingToken, setUser } from './actions';
import { loadAllCategories } from 'store/categories/operations';

export function login(loginData: LoginData, history: History): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    await withStatusMessages(dispatch, api.auth.login(loginData)).then(
      (response) => {
        const userData: UserData = response.payload.data;
        dispatch(setUser(userData));
        dispatch(loadAllCategories());
        history.push(HOME_ROUTE);
      }
    );
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
        dispatch(loadAllCategories());
      })
      .finally(() => dispatch(setIsValidatingToken(false)));
  };
}
