import { UserTaskListData } from '../../types/usertasks';

// Action names
export const SAVE_USER_TASK_LIST_FOR_DAY =
  'usertasks/SAVE_USER_TASK_LIST_FOR_DAY';

export const SAVE_USER_TASK_LIST_FOR_CHALLENGE =
  'usertasks/SAVE_USER_TASK_LIST_FOR_CHALLENGE';

// Action types
export interface SaveUserTaskListAction {
  type: typeof SAVE_USER_TASK_LIST_FOR_DAY;
  date: Date;
  userTaskList: UserTaskListData[];
}

export type UserTaskActions = SaveUserTaskListAction;

export interface UserTasksState {
  tasksByDay: Record<string, UserTaskListData[]>;
}
