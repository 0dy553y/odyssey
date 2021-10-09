import { format } from 'date-fns';

export const displayUsername = (username: string): string => {
  return `@${username}`;
};

export const displayDateRange = (fromDate: Date, toDate: Date): string => {
  if (fromDate.getFullYear() === toDate.getFullYear()) {
    return `${format(fromDate, 'd MMM')} - ${format(toDate, 'd MMM')}`;
  }
  return `${format(fromDate, 'd MMM yy')} - ${format(toDate, 'd MMM yy')}`;
};
