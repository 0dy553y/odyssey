import BaseAPI from './base';
import ChallengesAPI from './challenges';
import { ApiPromise, EmptyPayload } from '../types/api';
import { TaskData, TaskPostData, TaskPutData } from '../types/tasks';

class TasksAPI extends BaseAPI {
  protected static getTasksUrl(): string {
    return 'tasks';
  }

  public getTasksList(challengeId: number): ApiPromise<TaskData[]> {
    return this.get(
      `${ChallengesAPI.getChallengesUrl()}/${challengeId}/${TasksAPI.getTasksUrl()}`
    );
  }

  public getTask(challengeId: number, taskId: number): ApiPromise<TaskData> {
    return this.get(
      `${ChallengesAPI.getChallengesUrl()}/${challengeId}/${TasksAPI.getTasksUrl()}/${taskId}`
    );
  }

  public addTask(
    challengeId: number,
    taskPostData: TaskPostData
  ): ApiPromise<TaskData> {
    return this.post(
      `${ChallengesAPI.getChallengesUrl()}/${challengeId}/${TasksAPI.getTasksUrl()}`,
      taskPostData
    );
  }

  public editTask(
    challengeId: number,
    taskPutData: TaskPutData
  ): ApiPromise<TaskData> {
    return this.put(
      `${ChallengesAPI.getChallengesUrl()}/${challengeId}/${TasksAPI.getTasksUrl()}/${
        taskPutData.id
      }`,
      taskPutData
    );
  }

  public deleteTask(
    challengeId: number,
    taskId: number
  ): ApiPromise<EmptyPayload> {
    return this.delete(
      `${ChallengesAPI.getChallengesUrl()}/${challengeId}/${TasksAPI.getTasksUrl()}/${taskId}`
    );
  }
}

export default TasksAPI;
