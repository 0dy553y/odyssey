import api from 'api';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { loadAllUserChallengesDataForChallenge } from 'store/userchallenges/operations';
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

function markUserTaskAsDone(
  userTaskId: number,
  onChallengeCompleted: (completedChallengeName: string) => void,
  onOperationComplete: (
    dispatch: ThunkDispatch<RootState, undefined, AnyAction>,
    userTask: UserTaskData
  ) => void
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userTasks.markUserTaskAsDone(userTaskId);
    const userTask: UserTaskData = response.payload.data;
    if (userTask.isChallengeCompleted) {
      onChallengeCompleted(userTask.challengeName);
    }

    onOperationComplete(dispatch, userTask);
  };
}

export function markUserTaskAsDoneFromHome(
  userTaskId: number,
  onChallengeCompleted: (completedChallengeName: string) => void
): OperationResult {
  return markUserTaskAsDone(
    userTaskId,
    onChallengeCompleted,
    (dispatch, userTask) => {
      dispatch(saveUserTaskForDay(userTask.scheduledFor, userTask));
    }
  );
}

export function markUserTaskAsDoneFromChallenge(
  userTaskId: number,
  onChallengeCompleted: (completedChallengeName: string) => void
): OperationResult {
  return markUserTaskAsDone(
    userTaskId,
    onChallengeCompleted,
    (dispatch, userTask) => {
      dispatch(loadAllUserChallengesDataForChallenge(userTask.challengeId));
    }
  );
}

export function markUserTaskAsNotDone(userTaskId: number): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userTasks.markUserTaskAsNotDone(userTaskId);
    const userTask: UserTaskData = response.payload.data;
    dispatch(saveUserTaskForDay(userTask.scheduledFor, userTask));
  };
}

export function loadUserTaskActivityData(username?: string): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userTasks.getUserTaskActivityData(username);
    const data = response.payload.data;

    dispatch(saveUserTaskActivityData(data));
  };
}
