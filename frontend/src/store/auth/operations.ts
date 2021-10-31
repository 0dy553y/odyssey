import { batch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { loadAllCategories } from 'store/categories/operations';
import { resetFriends } from 'store/friends/actions';
import { resetNotifications } from 'store/notifications/actions';
import { resetPosts } from 'store/posts/actions';
import { resetSnackbars } from 'store/snackbars/actions';
import { resetUserChallenges } from 'store/userchallenges/actions';
import { resetUserTasks } from 'store/usertasks/actions';
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

export function login(loginData: LoginData): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    await withStatusMessages(dispatch, api.auth.login(loginData)).then(
      (response) => {
        const userData: UserData = response.payload.data;
        dispatch(setUser(userData));
        dispatch(loadAllCategories());
      }
    );
  };
}

export function logout(): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    await withStatusMessages(dispatch, api.auth.logout()).then(() => {
      batch(() => {
        // TODO: reset other store here as well
        dispatch(resetSnackbars());
        dispatch(resetAuth());
        dispatch(resetUserChallenges());
        dispatch(resetUserTasks());
        dispatch(resetPosts());
        dispatch(resetFriends());
        dispatch(resetNotifications());
      });
    });
  };
}

export function registerUser(registerData: RegisterData): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    await withStatusMessages(
      dispatch,
      api.auth.registerUser(registerData)
    ).then(() => {
      dispatch(login({ ...registerData }));
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
      // Do nothing
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {})
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
