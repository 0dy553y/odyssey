import {
  UserTaskActivityDatum,
  UserTaskData,
  UserTaskListData,
} from '../../types/usertasks';

// Action names
export const BULK_SAVE_USER_TASK_LISTS =
  'usertasks/BULK_SAVE_USER_TASK_FOR_DAYS';
export const SAVE_USER_TASK_LIST_FOR_DAY =
  'usertasks/SAVE_USER_TASK_LIST_FOR_DAY';
export const SAVE_USER_TASK_FOR_DAY = 'usertasks/SAVE_USER_TASK_FOR_DAY';
export const SAVE_USER_TASK_ACTIVITY_DATA =
  'usertasks/SAVE_USER_TASK_ACTIVITY_DATA';
export const RESET_USER_TASKS = 'usertasks/RESET_USER_TASKS';

// Action types
export interface BulkSaveUserTaskListAction {
  type: typeof BULK_SAVE_USER_TASK_LISTS;
  userTaskLists: Record<string, UserTaskListData[]>;
}

export interface SaveUserTaskListForDayAction {
  type: typeof SAVE_USER_TASK_LIST_FOR_DAY;
  date: Date;
  userTaskList: UserTaskListData[];
}

export interface SaveUserTaskForDayAction {
  type: typeof SAVE_USER_TASK_FOR_DAY;
  date: Date;
  userTask: UserTaskData;
}

export interface SaveUserTaskActivityDataAction {
  type: typeof SAVE_USER_TASK_ACTIVITY_DATA;
  userTaskActivityData: UserTaskActivityDatum[];
}

export interface ResetUserTasksAction {
  type: typeof RESET_USER_TASKS;
}

export type UserTaskActions =
  | BulkSaveUserTaskListAction
  | SaveUserTaskListForDayAction
  | SaveUserTaskForDayAction
  | SaveUserTaskActivityDataAction
  | ResetUserTasksAction;

export interface UserTasksState {
  tasksByDay: Record<string, UserTaskListData[]>;
  userTaskActivityData: UserTaskActivityDatum[];
}
