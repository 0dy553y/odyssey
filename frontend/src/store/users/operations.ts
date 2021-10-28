import { OperationResult } from '../../types/store';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../index';
import { AnyAction } from 'redux';
import api from '../../api';
import { UserData } from '../../types/auth';
import { saveUser } from './actions';

export function loadUser(userId?: number | string): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.users.getUserDetails(userId);
    const user: UserData = response.payload.data;
    dispatch(saveUser(user));
  };
}
