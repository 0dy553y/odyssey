import produce from 'immer';
import {
  REMOVE_TASK,
  SAVE_TASK,
  SAVE_TASK_LIST,
  TaskActions,
  TasksState,
} from './types';
import { TaskData, TaskListData } from '../../types/tasks';

const initialState: TasksState = {
  taskList: [],
  tasks: {},
};

const tasksReducer = produce((draft: TasksState, action: TaskActions) => {
  switch (action.type) {
    case SAVE_TASK_LIST: {
      draft.taskList = action.taskList;
      action.taskList.forEach(
        (task: TaskData) => (draft.tasks[task.id] = task)
      );
      break;
    }
    case SAVE_TASK: {
      if (!draft.taskList.includes(action.task)) {
        draft.taskList.push(action.task);
      }
      draft.tasks[action.task.id] = action.task;
      break;
    }
    case REMOVE_TASK: {
      draft.taskList = draft.taskList.filter(
        (task: TaskListData) => task.id !== action.taskId
      );
      delete draft.tasks[action.taskId];
      break;
    }
  }
}, initialState);

export default tasksReducer;
