import api from 'api';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { OperationResult } from 'types/store';
import { UserTaskData, UserTaskListData } from 'types/usertasks';
import { RootState } from '../index';
import { saveUserTaskForDay, saveUserTaskListForDay } from './actions';

export function loadUserTasksForDay(date: Date): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userTasks.getUserTaskListForDay(date);
    const userTasks: UserTaskListData[] = response.payload.data;
    dispatch(saveUserTaskListForDay(date, userTasks));
  };
}

export function markUserTaskAsDone(userTaskId: number): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userTasks.markUserTaskAsDone(userTaskId);
    const userTask: UserTaskData = response.payload.data;
    dispatch(saveUserTaskForDay(new Date(userTask.scheduledFor), userTask));
  };
}

export function markUserTaskAsNotDone(userTaskId: number): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userTasks.markUserTaskAsNotDone(userTaskId);
    const userTask: UserTaskData = response.payload.data;
    dispatch(saveUserTaskForDay(new Date(userTask.scheduledFor), userTask));
  };
}
