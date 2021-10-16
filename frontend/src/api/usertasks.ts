import { ApiPromise } from '../types/api';
import { UserTaskListData } from '../types/usertasks';
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
}

export default UserTasksAPI;
