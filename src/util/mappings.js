import moment from 'moment';

export const taskCategory = categories => task => {
  const category = categories.find(c => task.category === c._id) ||
    categories.find(c => c._id === 'default_category');
  return {
    ...task,
    category,
  }
}

export const formatTask = (t) => {
  const sTime = moment(t.start.dateTime);
  const eTime = moment(t.end.dateTime);
  const noTime = sTime.isSame(eTime);
  return {
    fromGoogle: true,
    _id: t.id,
    title: t.summary,
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
    ...(t.extendedProperties ? t.extendedProperties.private : {})
  };
}