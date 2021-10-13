import { UserTaskListData } from '../../types/usertasks';
import { SAVE_USER_TASK_LIST_FOR_DAY, SaveUserTaskListAction } from './types';

export function saveUserTaskList(
  date: Date,
  userTaskList: UserTaskListData[]
): SaveUserTaskListAction {
  return {
    type: SAVE_USER_TASK_LIST_FOR_DAY,
    date,
    userTaskList,
  };
}
