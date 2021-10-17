import api from 'api';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { OperationResult } from 'types/store';
import { UserTaskListData } from 'types/usertasks';
import { RootState } from '../index';
import { saveUserTaskActivityData, saveUserTaskList } from './actions';

export function loadUserTasksForDay(date: Date): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userTasks.getUserTaskListForDay(date);
    const userTasks: UserTaskListData[] = response.payload.data;
    dispatch(saveUserTaskList(date, userTasks));
  };
}

export function loadUserTaskActivityData(): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userTasks.getUserTaskActivityData();
    const data = response.payload.data;

    dispatch(
      saveUserTaskActivityData(
        data.map((datum) => {
          return {
            ...datum,
            date: new Date(datum.date),
          };
        })
      )
    );
  };
}
