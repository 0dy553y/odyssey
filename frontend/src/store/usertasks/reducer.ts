import {
  SAVE_USER_TASK_LIST_FOR_DAY,
  SAVE_USER_TASK_LIST_FOR_CHALLENGE,
  UserTaskActions,
  UserTasksState,
} from './types';
import produce from 'immer';

const initialState: UserTasksState = {
  tasksByDay: {},
  tasksByChallenge: {},
};

const userTasksReducer = produce(
  (draft: UserTasksState, action: UserTaskActions) => {
    switch (action.type) {
      case SAVE_USER_TASK_LIST_FOR_DAY: {
        draft.tasksByDay[action.date.toDateString()] = action.userTaskList;
        break;
      }
      case SAVE_USER_TASK_LIST_FOR_CHALLENGE: {
        draft.tasksByChallenge[action.challengeId] = action.userTaskList;
        break;
      }
    }
  },
  initialState
);

export default userTasksReducer;
