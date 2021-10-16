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

  // TODO: migrate this to userchallenge api
  public getUserTaskListForChallenge(
    challengeId: number
  ): ApiPromise<UserTaskListData[]> {
    return this.get(
      `${UserTasksAPI.getUserTasksUrl()}/tasks_for_challenge?challenge_id=${challengeId}`
    );
  }
}

export default UserTasksAPI;
