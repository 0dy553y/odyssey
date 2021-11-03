import api from 'api';
import { batch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { loadFriendsOnSameChallenges } from 'store/challenges/operations';
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
  onChallengeCompleted: (completedChallengeId: number) => void,
  onTaskCompleted: (openChallengeName: string) => void,
  onOperationComplete: (
    dispatch: ThunkDispatch<RootState, undefined, AnyAction>,
    userTask: UserTaskData
  ) => void
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userTasks.markUserTaskAsDone(userTaskId);
    const userTask: UserTaskData = response.payload.data;
    onTaskCompleted(userTask.challengeName);
    if (userTask.isChallengeCompleted) {
      onChallengeCompleted(userTask.challengeId);
    }
    onOperationComplete(dispatch, userTask);
  };
}

export function markUserTaskAsDoneFromHome(
  userTaskId: number,
  onChallengeCompleted: (completedChallengeId: number) => void,
  onTaskCompleted: (openChallengeName: string) => void
): OperationResult {
  return markUserTaskAsDone(
    userTaskId,
    onChallengeCompleted,
    onTaskCompleted,
    (dispatch, userTask) => {
      batch(() => {
        dispatch(saveUserTaskForDay(userTask.scheduledFor, userTask));
      });
    }
  );
}

export function markUserTaskAsDoneFromChallenge(
  userTaskId: number,
  onChallengeCompleted: (completedChallengeId: number) => void
): OperationResult {
  return markUserTaskAsDone(
    userTaskId,
    onChallengeCompleted,
    // TODO: replace when implementing from challenge page
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_cn) => {
      return;
    },
    (dispatch, userTask) => {
      batch(() => {
        dispatch(loadAllUserChallengesDataForChallenge(userTask.challengeId));
      });
    }
  );
}

export function markUserTaskAsNotDone(userTaskId: number): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userTasks.markUserTaskAsNotDone(userTaskId);
    const userTask: UserTaskData = response.payload.data;
    batch(() => {
      dispatch(saveUserTaskForDay(userTask.scheduledFor, userTask));
      dispatch(loadFriendsOnSameChallenges());
    });
  };
}

export function loadUserTaskActivityData(username?: string): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userTasks.getUserTaskActivityData(username);
    const data = response.payload.data;

    dispatch(saveUserTaskActivityData(data));
  };
}
