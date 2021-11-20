import api from 'api';
import { addDays, subDays } from 'date-fns';
import { batch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  loadAllOngoingChallengeMaps,
  loadAllUserChallengesDataForChallenge,
  loadChallengeMap,
} from 'store/userchallenges/operations';
import { OperationResult } from 'types/store';
import { UserTaskData, UserTaskListData } from 'types/usertasks';
import { getISOStringAtStartOfDay } from 'utils/date';
import { withStatusMessages } from 'utils/ui';
import { RootState } from '../index';
import {
  bulkSaveUserTaskLists,
  saveUserTaskActivityData,
  saveUserTaskForDay,
} from './actions';

export function loadUserTasksForDays(
  date: Date,
  range: number
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const fromDate = subDays(date, range);
    const toDate = addDays(date, range);

    const response = await api.userTasks.getUserTaskList(fromDate, toDate);
    const userTasks: UserTaskListData[] = response.payload.data;

    const userTasksMap: { [isoDate: string]: UserTaskListData[] } = {};
    userTasks.forEach((userTask) => {
      const date = getISOStringAtStartOfDay(userTask.scheduledFor);
      const userTasks = userTasksMap[date] ?? [];
      userTasks.push(userTask);
      userTasksMap[date] = userTasks;
    });

    dispatch(bulkSaveUserTaskLists(userTasksMap));
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
    const response = await withStatusMessages(
      dispatch,
      api.userTasks.markUserTaskAsDone(userTaskId)
    );
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
  onChallengeCompleted: (completedChallengeId: number) => void,
  onTaskCompleted: () => void
): OperationResult {
  return markUserTaskAsDone(
    userTaskId,
    onChallengeCompleted,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_: string) => {
      onTaskCompleted();
    },
    (dispatch, userTask) => {
      batch(() => {
        dispatch(loadAllUserChallengesDataForChallenge(userTask.challengeId));
      });
    }
  );
}

export function markUserTaskAsNotDoneFromHome(
  userTaskId: number
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userTasks.markUserTaskAsNotDone(userTaskId);
    const userTask: UserTaskData = response.payload.data;
    batch(() => {
      dispatch(saveUserTaskForDay(userTask.scheduledFor, userTask));
      dispatch(loadAllOngoingChallengeMaps());
    });
  };
}

export function markUserTaskAsNotDoneFromChallenge(
  userTaskId: number
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userTasks.markUserTaskAsNotDone(userTaskId);
    const userTask: UserTaskData = response.payload.data;
    batch(() => {
      dispatch(loadAllUserChallengesDataForChallenge(userTask.challengeId));
      dispatch(loadChallengeMap(userTask.challengeId));
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
