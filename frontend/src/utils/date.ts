import { startOfDay } from 'date-fns';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function getNeighbouringDates(date: Date, range: number): Date[] {
  const dates = [];
  for (let i = -range; i <= range; i++) {
    const newDate = startOfDay(new Date());
    newDate.setDate(date.getDate() + i);
    dates.push(newDate);
  }
  return dates;
}

export function getMonthString(date: Date): string {
  return dayjs(date).format('MMMM');
}

export function getDayString(date: Date): string {
  return dayjs(date).format('ddd');
}

export function getISOStringAtStartOfDay(date: Date): string {
  return dayjs(date).startOf('day').toISOString();
}

export function getDateFromNowString(date: Date): string {
  const format = {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    sameElse: () => dayjs(date).endOf('d').fromNow(),
  };
  const referenceStartOfDay = dayjs().startOf('d');
  const diff = referenceStartOfDay.diff(date, 'd');
  const sameElse = 'sameElse';
  const retVal =
    diff === 0
      ? 'sameDay'
      : diff === -1
      ? 'nextDay'
      : diff === 1
      ? 'lastDay'
      : sameElse;
  const currentFormat = format[retVal];

  if (typeof currentFormat === 'function') {
    return currentFormat();
  }
  return dayjs(date).format(currentFormat);
}
