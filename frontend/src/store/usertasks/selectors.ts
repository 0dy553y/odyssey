import { UserTaskListData } from 'types/usertasks';
import { RootState } from '../index';
import { UserTasksState } from './types';
import { getISOStringAtStartOfDay } from '../../utils/date';

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
