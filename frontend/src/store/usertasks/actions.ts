import { UserTaskActivityDatum, UserTaskListData } from '../../types/usertasks';
import {
  SaveUserTaskActivityDataAction,
  SaveUserTaskListAction,
  SAVE_USER_TASK_ACTIVITY_DATA,
  SAVE_USER_TASK_LIST_FOR_DAY,
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

export function saveUserTaskActivityData(
  userTaskActivityData: UserTaskActivityDatum[]
): SaveUserTaskActivityDataAction {
  return {
    type: SAVE_USER_TASK_ACTIVITY_DATA,
    userTaskActivityData,
  };
}
