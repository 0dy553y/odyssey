import BaseAPI from './base';
import { ApiPromise, EmptyPayload } from '../types/api';
import { TaskData, TaskPostData, TaskPutData } from '../types/tasks';

class TasksAPI extends BaseAPI {
  protected static getTasksUrl(): string {
    return 'tasks';
  }

  public getTasksList(): ApiPromise<TaskData[]> {
    return this.get(TasksAPI.getTasksUrl());
  }

  public getTask(taskId: number): ApiPromise<TaskData> {
    return this.get(`${TasksAPI.getTasksUrl()}/${taskId}`);
  }

  public addTask(taskPostData: TaskPostData): ApiPromise<TaskData> {
    return this.post(`${TasksAPI.getTasksUrl()}`, taskPostData);
  }

  public editTask(taskPutData: TaskPutData): ApiPromise<TaskData> {
    return this.put(`${TasksAPI.getTasksUrl()}/${taskPutData.id}`, taskPutData);
  }

  public deleteTask(taskId: number): ApiPromise<EmptyPayload> {
    return this.delete(`${TasksAPI.getTasksUrl()}/${taskId}`);
  }
}

export default TasksAPI;
