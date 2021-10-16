import { UserTaskListData } from '../../types/usertasks';
import {
  SAVE_USER_TASK_LIST_FOR_DAY,
  SAVE_USER_TASK_LIST_FOR_CHALLENGE,
  SaveUserTaskListAction,
  SaveUserTaskListForChallengeAction,
} from './types';

export function saveUserTaskList(
  date: Date,
  userTaskList: UserTaskListData[]
): SaveUserTaskListAction {
  return {
    type: SAVE_USER_TASK_LIST_FOR_DAY,
    date,
    userTaskList,
  };
}

export function saveUserTaskListForChallenge(
  challengeId: number,
  userTaskList: UserTaskListData[]
): SaveUserTaskListForChallengeAction {
  return {
    type: SAVE_USER_TASK_LIST_FOR_CHALLENGE,
    challengeId,
    userTaskList,
  };
}
