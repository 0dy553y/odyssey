import produce from 'immer';
import {
  REMOVE_TASK,
  SAVE_TASK,
  SAVE_TASK_LIST,
  TaskActions,
  TasksState,
} from './types';

const initialState: TasksState = {
  taskList: [],
  tasks: {},
};

const tasksReducer = produce((draft: TasksState, action: TaskActions) => {
  switch (action.type) {
    case SAVE_TASK_LIST: {
      draft.taskList = action.taskList;
      break;
    }
    case SAVE_TASK: {
      draft.tasks[action.task.id] = action.task;
      break;
    }
    case REMOVE_TASK: {
      delete draft.tasks[action.taskId];
      break;
    }
  }
}, initialState);

export default tasksReducer;
