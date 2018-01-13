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
  const noTime = sTime.isSame(eTime, 'minute');
  const noEndTime = !sTime.isSame(eTime, 'day');
  
  const otherProps = t.extendedProperties ? t.extendedProperties.private : {};
  const keys = Object.keys(otherProps);
  keys.forEach(k => {
    otherProps[k] = JSON.parse(otherProps[k]);
  })
  return {
    fromGoogle: true,
    _id: t.id,
    title: t.summary,
    description: t.description,
    date: moment(t.start.dateTime),
    startTime: noTime ? null : {
      hours: sTime.hours(),
      minutes: sTime.minutes(),
    },
    endTime: noEndTime || noTime ? null : {
      hours: eTime.hours(),
      minutes: eTime.minutes(),
    },
    category: 'default_category',
    completed: false,
    ...otherProps,
  };
}

export const taskToApi = (t, noId) => {
  return {
    id: noId ? undefined : t._id,
    summary: t.title,
    description: t.description,
    ...makeDateObject(t),
    extendedProperties: {
      private: {
        completed: JSON.stringify(t.completed),
        category: JSON.stringify(t.category),
      },
    }
  };
}

const makeDateObject = (t) => {
  const date = moment(t.date);
  if (!t.startTime && !t.endTime) {
    return {
      start: date,
      end: date,
    }
  }
  if (t.startTime && !t.endTime){
    return {
      start: makeTimeObject(t.startTime, date),
      end: {
        dateTime: moment(date).hour(0).minute(0).second(0).add(1, 'day').format(),
        date: null,
      }
    }
  }
  return {
    start: makeTimeObject(t.startTime, date),
    end: makeTimeObject(t.endTime, date),
  };
}

const makeTimeObject = (time, date) => {
  const startTime = date.hour(time.hours).minute(time.minutes);
  return { dateTime: startTime.format(), date: null };
}