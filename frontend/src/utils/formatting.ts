import { Dayjs } from 'dayjs';

export const displayUsername = (username: string): string => {
  return `@${username}`;
};

export const displayDateRange = (fromDate: Dayjs, toDate: Dayjs): string => {
  if (fromDate.year === toDate.year) {
    return `${fromDate.format('D MMM')} - ${toDate.format('D MMM')}`;
  }
  return `${fromDate.format('D MMM YY')} - ${toDate.format('D MMM YY')}`;
};
