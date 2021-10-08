import { OperationResult } from '../../types/store';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../index';
import { AnyAction } from 'redux';
import api from '../../api';
import { batch } from 'react-redux';
import {
  TaskData,
  TaskListData,
  TaskPostData,
  TaskPutData,
} from '../../types/tasks';
import { removeTask, saveTask, saveTaskList } from './actions';

export function loadAllTasks(challengeId: number): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.tasks.getTaskList(challengeId);
    const tasks: TaskListData[] = response.payload.data;
    dispatch(saveTaskList(tasks));
  };
}

export function loadTask(challengeId: number, taskId: number): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.tasks.getTask(challengeId, taskId);
    const task: TaskData = response.payload.data;
    dispatch(saveTask(task));
  };
}

export function createTask(taskPostData: TaskPostData): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.tasks.addTask(taskPostData);
    const task: TaskData = response.payload.data;
    dispatch(saveTask(task));
  };
}

export function updateTask(taskPutData: TaskPutData): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.tasks.editTask(taskPutData);
    const task: TaskData = response.payload.data;
    batch(() => {
      dispatch(removeTask(task.id));
      dispatch(saveTask(task));
    });
  };
}

export function deleteTask(
  challengeId: number,
  taskId: number
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    await api.tasks.deleteTask(challengeId, taskId);
    dispatch(removeTask(taskId));
  };
}
