import { format, formatDuration } from 'date-fns';

export const displayUsername = (username: string): string => {
  return `@${username}`;
};

export const displayDateRange = (fromDate: Date, toDate: Date): string => {
  if (fromDate.getFullYear() === toDate.getFullYear()) {
    return `${format(fromDate, 'd MMM')} - ${format(toDate, 'd MMM')}`;
  }
  return `${format(fromDate, 'd MMM yy')} - ${format(toDate, 'd MMM yy')}`;
};

export const displayDate = (date: Date): string => {
  return format(date, 'd MMM yyyy');
};

export const displayDuration = (duration: Duration): string => {
  return formatDuration(duration, { delimiter: ', ' });
};
