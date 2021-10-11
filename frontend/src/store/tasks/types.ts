import { TaskData, TaskListData } from '../../types/tasks';

// Action names
export const SAVE_TASK_LIST = 'tasks/SAVE_TASK_LIST';
export const SAVE_TASK = 'tasks/SAVE_TASK';
export const REMOVE_TASK = 'tasks/REMOVE_TASK';

// Action types
export interface SaveTaskListAction {
  type: typeof SAVE_TASK_LIST;
  taskList: TaskListData[];
}

export interface SaveTaskAction {
  type: typeof SAVE_TASK;
  task: TaskData;
}

export interface RemoveTaskAction {
  type: typeof REMOVE_TASK;
  taskId: number;
}

export type TaskActions =
  | SaveTaskListAction
  | SaveTaskAction
  | RemoveTaskAction;

export interface TasksState {
  taskList: TaskListData[];
  tasks: Record<number, TaskData>;
}
