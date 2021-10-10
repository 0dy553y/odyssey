import { format, formatDuration, intervalToDuration } from 'date-fns';

export const displayUsername = (username: string): string => {
  return `@${username}`;
};

export const displayDateRange = (fromDate: Date, toDate: Date): string => {
  // Omit year if both dates are in the current year
  if (
    fromDate.getFullYear() === new Date().getFullYear() &&
    fromDate.getFullYear() === toDate.getFullYear()
  ) {
    return `${format(fromDate, 'd MMM')} - ${format(toDate, 'd MMM')}`;
  }
  return `${format(fromDate, 'd MMM yy')} - ${format(toDate, 'd MMM yy')}`;
};

export const displayDate = (date: Date): string => {
  return format(date, 'd MMM yyyy');
};

export const displayDuration = (duration: Duration): string => {
  const durationInSeconds = durationToSeconds(duration);

  // To properly handle the case where you have something like { months: 1, days: 50 }
  // but you want to display 2 months
  return formatDuration(
    intervalToDuration({ start: 0, end: durationInSeconds * 1000 })
  );
};

const durationToSeconds = (duration: Duration): number => {
  const numYears = duration.years ?? 0;
  const numMonths = (duration.months ?? 0) + numYears * 12;
  const numWeeks = (duration.weeks ?? 0) + numMonths * 4;
  const numDays = (duration.days ?? 0) + numWeeks * 7;
  const numHours = (duration.hours ?? 0) + numDays * 24;
  const numMinutes = (duration.minutes ?? 0) + numHours * 60;
  const numSeconds = (duration.seconds ?? 0) + numMinutes * 60;

  return numSeconds;
};
