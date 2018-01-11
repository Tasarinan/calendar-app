import moment from 'moment';

export const taskCategory = categories => task => {
  const category = categories.find(c => task.category === c._id) ||
    categories.find(c => c._id === 'default_category');
  return {
    ...task,
    category,
  }
}

export const taskToLocal = (t) => {
  const sTime = moment(t.start.dateTime);
  const eTime = moment(t.end.dateTime);
  const noTime = sTime.isSame(eTime);
  
  const otherProps = t.extendedProperties ? t.extendedProperties.private : {};
  const keys = Object.keys(otherProps);
  keys.forEach(k => {
    try { otherProps[k] = JSON.parse(otherProps[k]); }
    catch (e) {}
  })
  return {
    fromGoogle: true,
    _id: t.id,
    title: t.summary,
    description: t.description,
    date: moment(t.start.date),
    startTime: noTime ? null : {
      hours: sTime.hours(),
      minutes: sTime.minutes(),
    },
    endTime: t.endTimeUnspecified || noTime ? null : {
      hours: eTime.hours(),
      minutes: eTime.minutes(),
    },
    completed: false,
    ...otherProps,
  };
}

export const taskToApi = (t) => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const date = moment(t.date);
  return {
    id: t._id,
    summary: t.title,
    description: t.description,
    start: makeTimeObject(t.startTime, date, tz),
    end: makeTimeObject(t.endTime, date, tz),
    extendedProperties: {
      private: {
        completed: JSON.stringify(t.completed)
      }
    }
  };
}

const makeTimeObject = (time, date, tz) => {
  const startTime = time ? date.hour(time.hours).minute(time.minutes) : null;
  return startTime ? {
    date,
    dateTime: startTime.format(),
  } : undefined;
}