import { format, formatDuration, intervalToDuration } from 'date-fns';

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

export const getFormattedStringFromDays = (numberOfDays: number): string => {
  const years = Math.floor(numberOfDays / 365);
  const months = Math.floor((numberOfDays % 365) / 30);
  const days = Math.floor((numberOfDays % 365) % 30);

  const yearsDisplay =
    years > 0 ? years + (years == 1 ? ' year ' : ' years ') : '';
  const monthsDisplay =
    months > 0 ? months + (months == 1 ? ' month ' : ' months ') : '';
  const daysDisplay = days > 0 ? days + (days == 1 ? ' day' : ' days') : '';
  return yearsDisplay + monthsDisplay + daysDisplay;
};
