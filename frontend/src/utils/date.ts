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
