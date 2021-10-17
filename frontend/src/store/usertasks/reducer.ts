import produce from 'immer';
import {
  SAVE_USER_TASK_ACTIVITY_DATA,
  SAVE_USER_TASK_LIST_FOR_DAY,
  UserTaskActions,
  UserTasksState,
} from './types';

const initialState: UserTasksState = {
  tasksByDay: {},
  userTaskActivityData: [],
};

const userTasksReducer = produce(
  (draft: UserTasksState, action: UserTaskActions) => {
    switch (action.type) {
      case SAVE_USER_TASK_LIST_FOR_DAY: {
        draft.tasksByDay[action.date.toDateString()] = action.userTaskList;
        break;
      }
      case SAVE_USER_TASK_ACTIVITY_DATA: {
        draft.userTaskActivityData = action.userTaskActivityData;
      }
    }
  },
  initialState
);

export default userTasksReducer;
