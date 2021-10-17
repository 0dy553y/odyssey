import { UserTaskActivityDatum, UserTaskListData } from 'types/usertasks';
import { RootState } from '../index';
import { UserTasksState } from './types';

function getLocalState(state: RootState): UserTasksState {
  return state.userTasks;
}

export function getUserTaskListForDay(
  state: RootState,
  date: Date
): UserTaskListData[] {
  return getLocalState(state).tasksByDay[date.toDateString()] ?? [];
}

export function getUserTaskActivityData(
  state: RootState
): UserTaskActivityDatum[] {
  return getLocalState(state).userTaskActivityData;
}
