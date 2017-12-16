import c from 'calendar';

export const getDays = (year, month, weekStart) => {
  const cal = new c.Calendar(weekStart);
  let days = cal.monthDays(year, month-1);
  
  const lastYear = month === 1 ? year - 1 : year;
  const nextYear = month === 12 ? year + 1 : year;
  const lastMonth = month === 1 ? 11 : month-1;
  const nextMonth = month === 12 ? 0 : month-1;

  let last = cal.monthDays(lastYear, lastMonth);
  last = last[last.length-1].filter(d => d !== 0);
  let i = last.length-1;
  days[0] = days[0].map(d => {
    if (d === 0) {
      return last[i--] * -1;
    }
    return d;
  });

  let next = cal.monthDays(nextYear, nextMonth);
  next = next[0].filter(d => d !== 0);
  i = 0;
  days[days.length-1] = days[days.length-1].map(d => {
    if (d === 0) {
      return next[i++] * -1;
    }
    return d;
  });

  return days;
};