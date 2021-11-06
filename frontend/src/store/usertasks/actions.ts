import {
  UserTaskActivityDatum,
  UserTaskData,
  UserTaskListData,
} from '../../types/usertasks';
import {
  BulkSaveUserTaskListAction,
  BULK_SAVE_USER_TASK_LISTS,
  ResetUserTasksAction,
  RESET_USER_TASKS,
  SaveUserTaskActivityDataAction,
  SaveUserTaskForDayAction,
  SaveUserTaskListForDayAction,
  SAVE_USER_TASK_ACTIVITY_DATA,
  SAVE_USER_TASK_FOR_DAY,
  SAVE_USER_TASK_LIST_FOR_DAY,
} from './types';

export function bulkSaveUserTaskLists(
  userTaskLists: Record<string, UserTaskListData[]>
): BulkSaveUserTaskListAction {
  return {
    type: BULK_SAVE_USER_TASK_LISTS,
    userTaskLists,
  };
}
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

export function resetUserTasks(): ResetUserTasksAction {
  return {
    type: RESET_USER_TASKS,
  };
}
