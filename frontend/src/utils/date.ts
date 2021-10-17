import moment from 'moment';

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
  return moment(date).format('MMMM');
}

export function getDayString(date: Date): string {
  return moment(date).format('ddd');
}

export function getDateFromNowString(date: Date): string {
  const fromNow = moment(date).fromNow();
  return moment(date).calendar(null, {
    lastWeek: '[Last] dddd',
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    sameElse: function () {
      return '[' + fromNow + ']';
    },
  });
}
