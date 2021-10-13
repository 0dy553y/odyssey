import {
  SAVE_USER_TASK_LIST_FOR_DAY,
  UserTaskActions,
  UserTasksState,
} from './types';
import produce from 'immer';

const initialState: UserTasksState = {
  tasksByDay: {},
};

const userTasksReducer = produce(
  (draft: UserTasksState, action: UserTaskActions) => {
    switch (action.type) {
      case SAVE_USER_TASK_LIST_FOR_DAY: {
        draft.tasksByDay[action.date.toDateString()] = action.userTaskList;
        break;
      }
    }
  },
  initialState
);

export default userTasksReducer;
