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

export function getLatestCompletedTaskForChallenge(
  state: RootState,
  challengeId: number
): UserTaskListData | null {
  const completedUserTasks = getUserTaskListForChallenge(
    state,
    challengeId
  ).filter((task) => task.isCompleted);

  const numCompletedTasks = completedUserTasks.length;
  if (numCompletedTasks === 0) {
    return null;
  }

  return completedUserTasks[numCompletedTasks - 1];
}
