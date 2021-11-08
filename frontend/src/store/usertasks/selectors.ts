import { isBefore, startOfDay } from 'date-fns';
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

export function getDatesWithOverdueTasks(state: RootState): Date[] {
  const output: Date[] = [];
  const today = startOfDay(new Date());

  const tasksByDay = getLocalState(state).tasksByDay;

  Object.entries(tasksByDay).forEach(([isoDate, tasks]) => {
    const date = new Date(isoDate);

    if (!isBefore(date, today)) {
      return;
    }

    for (const task of tasks) {
      if (!task.completedAt) {
        output.push(date);
        break;
      }
    }
  });

  return output;
}
