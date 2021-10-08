import { RootState } from '../index';
import { TasksState } from './types';
import { TaskData, TaskListData } from '../../types/tasks';

function getLocalState(state: RootState): TasksState {
  return state.tasks;
}

export function getTaskList(
  state: RootState,
  challengeId: number
): TaskListData[] {
  return getLocalState(state).taskList.filter(
    (task: TaskListData) => task.challengeId === challengeId
  );
}

export function getTask(state: RootState, taskId: number): TaskData {
  return getLocalState(state).tasks[taskId];
}
