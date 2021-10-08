import { TaskData, TaskListData } from '../../types/tasks';
import {
  REMOVE_TASK,
  RemoveTaskAction,
  SAVE_TASK,
  SAVE_TASK_LIST,
  SaveTaskAction,
  SaveTaskListAction,
} from './types';

export function saveTaskList(taskList: TaskListData[]): SaveTaskListAction {
  return {
    type: SAVE_TASK_LIST,
    taskList,
  };
}

export function saveTask(task: TaskData): SaveTaskAction {
  return {
    type: SAVE_TASK,
    task,
  };
}

export function removeTask(taskId: number): RemoveTaskAction {
  return {
    type: REMOVE_TASK,
    taskId,
  };
}
