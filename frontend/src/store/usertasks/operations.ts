import api from 'api';
import { startOfDay } from 'date-fns';
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
    const userTasks: UserTaskListData[] = response.payload.data.map(
      mapUserTaskDateStringsIntoDateObjects
    );
    dispatch(saveUserTaskListForDay(date, userTasks));
  };
}

function markUserTaskAsDone(
  userTaskId: number,
  onChallengeCompleted: (completedChallengeName: string) => void,
  onApiComplete: (
    dispatch: ThunkDispatch<RootState, undefined, AnyAction>,
    userTask: UserTaskData
  ) => void
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userTasks.markUserTaskAsDone(userTaskId);
    const userTask: UserTaskData = mapUserTaskDateStringsIntoDateObjects(
      response.payload.data
    );
    if (userTask.isChallengeCompleted) {
      onChallengeCompleted(userTask.challengeName);
    }

    onApiComplete(dispatch, userTask);
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
      const date = new Date(userTask.scheduledFor);
      dispatch(saveUserTaskForDay(date, userTask));
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
      dispatch(loadOngoingUserChallengeDataForChallenge(userTask.challengeId));
    }
  );
}

export function markUserTaskAsNotDone(userTaskId: number): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userTasks.markUserTaskAsNotDone(userTaskId);
    const userTask: UserTaskData = mapUserTaskDateStringsIntoDateObjects(
      response.payload.data
    );
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

// Exporting only to be used in loadOngoingUserChallengeDataForChallenge
// in userchallenges operation
export function mapUserTaskDateStringsIntoDateObjects(
  userTask: UserTaskListData | UserTaskData
): UserTaskListData | UserTaskData {
  return {
    ...userTask,
    completedAt: userTask.completedAt && new Date(userTask.completedAt),
    scheduledFor: startOfDay(new Date(userTask.scheduledFor)),
  };
}
