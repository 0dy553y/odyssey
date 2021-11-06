import produce from 'immer';
import { getISOStringAtStartOfDay } from '../../utils/date';
import {
  BULK_SAVE_USER_TASK_LISTS,
  RESET_USER_TASKS,
  SAVE_USER_TASK_ACTIVITY_DATA,
  SAVE_USER_TASK_FOR_DAY,
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
      case BULK_SAVE_USER_TASK_LISTS: {
        draft.tasksByDay = {
          ...draft.tasksByDay,
          ...action.userTaskLists,
        };
        break;
      }
      case SAVE_USER_TASK_LIST_FOR_DAY: {
        const key = getISOStringAtStartOfDay(action.date);
        draft.tasksByDay[key] = action.userTaskList;
        break;
      }
      case SAVE_USER_TASK_FOR_DAY: {
        const key = getISOStringAtStartOfDay(action.date);
        const userTaskIndex = draft.tasksByDay[key].findIndex(
          (userTask) => userTask.id === action.userTask.id
        );

        draft.tasksByDay[key] = [
          ...draft.tasksByDay[key].slice(0, userTaskIndex),
          action.userTask,
          ...draft.tasksByDay[key].slice(userTaskIndex + 1),
        ];
        break;
      }
      case SAVE_USER_TASK_ACTIVITY_DATA: {
        draft.userTaskActivityData = action.userTaskActivityData;
        break;
      }
      case RESET_USER_TASKS: {
        draft.tasksByDay = {};
        draft.userTaskActivityData = [];
        break;
      }
    }
  },
  initialState
);

export default userTasksReducer;
