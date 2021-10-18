import api from 'api';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { loadOngoingUserChallengeDataForChallenge } from 'store/userchallenges/operations';
import { OperationResult } from 'types/store';
import { UserTaskData, UserTaskListData } from 'types/usertasks';
import { RootState } from '../index';
import {
  saveUserTaskActivityData,
  saveUserTaskForDay,
  saveUserTaskListForDay,
} from './actions';

export function loadUserTasksForDay(date: Date): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userTasks.getUserTaskListForDay(date);
    const userTasks: UserTaskListData[] = response.payload.data;
    dispatch(saveUserTaskListForDay(date, userTasks));
  };
}

export function markUserTaskAsDone(
  userTaskId: number,
  fromChallenge?: boolean
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userTasks.markUserTaskAsDone(userTaskId);
    const userTask: UserTaskData = response.payload.data;
    if (fromChallenge) {
      dispatch(loadOngoingUserChallengeDataForChallenge(userTask.challengeId));
    } else {
      const date = new Date(userTask.scheduledFor);
      date.setDate(date.getDate());
      dispatch(saveUserTaskForDay(date, userTask));
    }
  };
}

export function markUserTaskAsNotDone(userTaskId: number): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userTasks.markUserTaskAsNotDone(userTaskId);
    const userTask: UserTaskData = response.payload.data;
    const date = new Date(userTask.scheduledFor);
    date.setDate(date.getDate());
    dispatch(saveUserTaskForDay(date, userTask));
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
