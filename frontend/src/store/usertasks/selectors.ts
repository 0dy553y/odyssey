import { UserTaskActivityDatum, UserTaskListData } from 'types/usertasks';
import { getISOStringAtStartOfDay } from '../../utils/date';
import { RootState } from '../index';
import { UserTasksState } from './types';

function getLocalState(state: RootState): UserTasksState {
  return state.userTasks;
}

export function getUserTaskListForDay(
  state: RootState,
  date: Date
): UserTaskListData[] {
  const key = getISOStringAtStartOfDay(date);
  return getLocalState(state).tasksByDay[key] ?? [];
}

export function getUserTaskActivityData(
  state: RootState
): UserTaskActivityDatum[] {
  return getLocalState(state).userTaskActivityData;
}
