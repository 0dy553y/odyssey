import {
  UserTaskActivityDatum,
  UserTaskData,
  UserTaskListData,
} from '../../types/usertasks';
import {
  SAVE_USER_TASK_ACTIVITY_DATA,
  SAVE_USER_TASK_FOR_DAY,
  SAVE_USER_TASK_LIST_FOR_DAY,
  SaveUserTaskActivityDataAction,
  SaveUserTaskForDayAction,
  SaveUserTaskListForDayAction,
} from './types';

export function saveUserTaskListForDay(
  date: Date,
  userTaskList: UserTaskListData[]
): SaveUserTaskListForDayAction {
  return {
    type: SAVE_USER_TASK_LIST_FOR_DAY,
    date,
    userTaskList,
  };
}

export function saveUserTaskForDay(
  date: Date,
  userTask: UserTaskData
): SaveUserTaskForDayAction {
  return {
    type: SAVE_USER_TASK_FOR_DAY,
    date,
    userTask,
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
