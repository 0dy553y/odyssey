import produce from 'immer';
import {
  SAVE_USER_TASK_FOR_DAY,
  SAVE_USER_TASK_LIST_FOR_DAY,
  UserTaskActions,
  UserTasksState,
} from './types';

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
      case SAVE_USER_TASK_FOR_DAY: {
        const key = action.date.toDateString();
        const userTaskIndex = draft.tasksByDay[key].findIndex(
          (userTask) => userTask.id === action.userTask.id
        );
        draft.tasksByDay[key] = [
          ...draft.tasksByDay[key].splice(0, userTaskIndex),
          action.userTask,
          ...draft.tasksByDay[key].splice(userTaskIndex + 1),
        ];
        break;
      }
    }
  },
  initialState
);

export default userTasksReducer;
