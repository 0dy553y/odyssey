import BaseAPI from './base';
import { ApiPromise } from '../types/api';
import { UserTaskListData } from '../types/usertasks';

class UserTasksAPI extends BaseAPI {
  protected static getUserTasksUrl(): string {
    return 'user_tasks';
  }

  public getUserTaskListForDay(date: Date): ApiPromise<UserTaskListData[]> {
    return this.get(
      `${UserTasksAPI.getUserTasksUrl()}/tasks_for_day?date=${date.toISOString()}`
    );
  }
}

export default UserTasksAPI;
