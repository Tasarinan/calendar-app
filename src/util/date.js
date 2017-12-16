import c from 'calendar';

export const getDays = (year, month, weekStart) => {
  const cal = new c.Calendar(weekStart);
  let days = cal.monthDays(year, month-1);
  
  let changed = resolveMonthChange(year, month, false);

  //change 0's with last month's days
  let last = cal.monthDays(changed.year, changed.month);
  last = last[last.length-1].filter(d => d !== 0);
  last.reverse();
  let i = last.length-1;
  days[0] = days[0].map(d => {
    if (d === 0) {
      return last[i--] * -1;
    }
    return d;
  });

  changed = resolveMonthChange(year, month, true);

  //change 0's with next month's days
  let next = cal.monthDays(changed.year, changed.month);
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

//returns month from 0
export const resolveMonthChange = (year, month, add) => {
  let changedMonth = add ? month : month - 2;
  let changedYear = year;
  if (add && changedMonth === 12) {
    changedYear = year + 1;
    changedMonth = 0;
  } else if(changedMonth === -1) {
    changedYear = year - 1;
    changedMonth = 11;
  }
  return {
    year: changedYear,
    month: changedMonth
  };
};

export const isToday = (year, month, day) => {
  const date = new Date();
  return (
    date.getDate() === day &&
    date.getMonth() === month - 1 &&
    date.getFullYear() === year
  );
}

export const getMonthName = month => {
  return monthNames[month-1];
};

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                    'August', 'September', 'October', 'November', 'December'];