import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';

dayjs.extend(relativeTime);
dayjs.extend(calendar);

export function getNeighbouringDates(date: Date, range: number): Date[] {
  const dates = [];
  for (let i = -range; i <= range; i++) {
    const newDate = new Date();
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
  return dayjs(date).calendar(null, {
    lastWeek: '[Last] dddd',
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    sameElse: () => dayjs(date).fromNow(),
  });
}
