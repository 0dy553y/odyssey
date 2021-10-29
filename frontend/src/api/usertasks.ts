import { startOfDay } from 'date-fns';
import { ApiPromise } from '../types/api';
import {
  UserTaskActivityDatum,
  UserTaskData,
  UserTaskListData,
} from '../types/usertasks';
import BaseAPI from './base';

export type PseudoUserTaskListData = Omit<
  UserTaskListData,
  'scheduledFor' | 'completedAt'
> & {
  scheduledFor: string;
  completedAt?: string;
};

export type PseudoUserTaskData = Omit<
  UserTaskData,
  'scheduledFor' | 'completedAt'
> & {
  scheduledFor: string;
  completedAt?: string;
};

export type PseudoUserTaskActivityDatum = Omit<
  UserTaskActivityDatum,
  'date'
> & { date: string };

export const userTaskListDataMapper = (
  userTask: PseudoUserTaskListData
): UserTaskListData => {
  return {
    ...userTask,
    scheduledFor: startOfDay(new Date(userTask.scheduledFor)),
    completedAt: userTask.completedAt
      ? new Date(userTask.completedAt)
      : undefined,
  };
};

export const userTaskDataMapper = (
  userTask: PseudoUserTaskData
): UserTaskData => {
  return {
    ...userTask,
    scheduledFor: startOfDay(new Date(userTask.scheduledFor)),
    completedAt: userTask.completedAt
      ? new Date(userTask.completedAt)
      : undefined,
  };
};

export const userTaskActivityDatumMapper = (
  userTaskActivity: PseudoUserTaskActivityDatum
): UserTaskActivityDatum => {
  return {
    ...userTaskActivity,
    date: new Date(userTaskActivity.date),
  };
};

class UserTasksAPI extends BaseAPI {
  protected static getUserTasksUrl(): string {
    return 'user_tasks';
  }

  public getUserTaskListForDay(date: Date): ApiPromise<UserTaskListData[]> {
    return this.get(
      `${UserTasksAPI.getUserTasksUrl()}/tasks_for_day?date=${date.toISOString()}`
    ).then((resp) => {
      const data = (resp.payload.data as PseudoUserTaskListData[]).map(
        userTaskListDataMapper
      );
      return {
        ...resp,
        payload: {
          data,
        },
      };
    });
  }

  public markUserTaskAsDone(userTaskId: number): ApiPromise<UserTaskData> {
    return this.post(
      `${UserTasksAPI.getUserTasksUrl()}/${userTaskId}/mark_as_done`,
      null
    ).then((resp) => {
      const data = userTaskDataMapper(resp.payload.data as PseudoUserTaskData);
      return {
        ...resp,
        payload: {
          data,
        },
      };
    });
  }

  public markUserTaskAsNotDone(userTaskId: number): ApiPromise<UserTaskData> {
    return this.post(
      `${UserTasksAPI.getUserTasksUrl()}/${userTaskId}/mark_as_not_done`,
      null
    ).then((resp) => {
      const data = userTaskDataMapper(resp.payload.data as PseudoUserTaskData);
      return {
        ...resp,
        payload: {
          data,
        },
      };
    });
  }

  public getUserTaskActivityData(
    username?: string
  ): ApiPromise<UserTaskActivityDatum[]> {
    return this.get(
      `${UserTasksAPI.getUserTasksUrl()}/user_task_activity_data?username=${
        username ?? ''
      }`
    ).then((resp) => {
      const data = (resp.payload.data as PseudoUserTaskActivityDatum[]).map(
        userTaskActivityDatumMapper
      );
      return {
        ...resp,
        payload: {
          data,
        },
      };
    });
  }
}

export default UserTasksAPI;
