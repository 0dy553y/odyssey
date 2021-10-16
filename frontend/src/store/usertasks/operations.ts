import api from 'api';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { OperationResult } from 'types/store';
import { UserTaskListData } from 'types/usertasks';
import { RootState } from '../index';
import { saveUserTaskList, saveUserTaskListForChallenge } from './actions';

export function loadUserTasksForDay(date: Date): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userTasks.getUserTaskListForDay(date);
    const userTasks: UserTaskListData[] = response.payload.data;
    dispatch(saveUserTaskList(date, userTasks));
  };
}

export function loadUserTasksForChallenge(
  challengeId: number
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userTasks.getUserTaskListForChallenge(
      challengeId
    );
    const userTasks: UserTaskListData[] = response.payload.data.map(
      (userTask) => {
        return {
          ...userTask,
          completedAt: userTask.completedAt && new Date(userTask.completedAt),
        };
      }
    );
    console.log(userTasks);
    dispatch(saveUserTaskListForChallenge(challengeId, userTasks));
  };
}
