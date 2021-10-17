import {
  UserTaskActivityDatum,
  UserTaskData,
  UserTaskListData,
} from '../../types/usertasks';

// Action names
export const SAVE_USER_TASK_LIST_FOR_DAY =
  'usertasks/SAVE_USER_TASK_LIST_FOR_DAY';
export const SAVE_USER_TASK_FOR_DAY = 'usertasks/SAVE_USER_TASK_FOR_DAY';
export const SAVE_USER_TASK_ACTIVITY_DATA =
  'usertasks/SAVE_USER_TASK_ACTIVITY_DATA';

// Action types
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

export type UserTaskActions =
  | SaveUserTaskListForDayAction
  | SaveUserTaskForDayAction
  | SaveUserTaskActivityDataAction;

export interface UserTasksState {
  tasksByDay: Record<string, UserTaskListData[]>;
  userTaskActivityData: UserTaskActivityDatum[];
}
