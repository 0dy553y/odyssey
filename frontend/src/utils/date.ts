export function getDatesInMonth(month: number, year: number): Date[] {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export function getNeighbouringDates(date: Date, range: number): Date[] {
  const dates = [];
  for (let i = -range; i <= range; i++) {
    const newDate = new Date();
    newDate.setDate(date.getDate() + i);
    dates.push(newDate);
  }
  return dates;
}
