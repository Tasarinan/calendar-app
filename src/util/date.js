import c from 'calendar';

export const getDays = (date, weekStart) => {
  const cal = new c.Calendar(weekStart);
  let days = cal.monthDays(date.year(), date.month());

  //change 0's with last month's days
  let i = 0;
  days[0] = days[0]
    .reverse()
    .map(d => d === 0 ? i-- : d)
    .reverse();

  //change 0's with next month's days
  i = date.daysInMonth();
  days[days.length-1] = days[days.length-1]
    .map(d => d === 0 ? i++ : d);

  return days;
};

export const getTime = time => {
  if (!time) return null;
  const mins = time.minutes;
  return `${time.hours}:${mins < 10 ? '0' + mins : mins}`
}