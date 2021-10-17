import { UserTaskData, UserTaskListData } from '../../types/usertasks';

// Action names
export const SAVE_USER_TASK_LIST_FOR_DAY =
  'usertasks/SAVE_USER_TASK_LIST_FOR_DAY';
export const SAVE_USER_TASK_FOR_DAY = 'usertasks/SAVE_USER_TASK_FOR_DAY';

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

export type UserTaskActions =
  | SaveUserTaskListForDayAction
  | SaveUserTaskForDayAction;

export interface UserTasksState {
  tasksByDay: Record<string, UserTaskListData[]>;
}
