import { ApiPromise } from '../types/api';
import {
  UserTaskActivityDatum,
  UserTaskData,
  UserTaskListData,
} from '../types/usertasks';
import BaseAPI from './base';

class UserTasksAPI extends BaseAPI {
  protected static getUserTasksUrl(): string {
    return 'user_tasks';
  }

  public getUserTaskListForDay(date: Date): ApiPromise<UserTaskListData[]> {
    return this.get(
      `${UserTasksAPI.getUserTasksUrl()}/tasks_for_day?date=${date.toISOString()}`
    );
  }

  public markUserTaskAsDone(userTaskId: number): ApiPromise<UserTaskData> {
    return this.post(
      `${UserTasksAPI.getUserTasksUrl()}/${userTaskId}/mark_as_done`,
      null
    );
  }

  public markUserTaskAsNotDone(userTaskId: number): ApiPromise<UserTaskData> {
    return this.post(
      `${UserTasksAPI.getUserTasksUrl()}/${userTaskId}/mark_as_not_done`,
      null
    );
  }

  public getUserTaskActivityData(
    userId?: number | string
  ): ApiPromise<UserTaskActivityDatum[]> {
    return this.get(
      `${UserTasksAPI.getUserTasksUrl()}/user_task_activity_data?userId=${
        userId ?? ''
      }`
    );
  }
}

export default UserTasksAPI;
