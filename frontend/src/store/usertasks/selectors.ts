import { UserTaskListData } from 'types/usertasks';
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

export function getUserTaskListForChallenge(
  state: RootState,
  challengeId: number
): UserTaskListData[] {
  return getLocalState(state).tasksByChallenge[challengeId] ?? [];
}
