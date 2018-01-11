import moment from 'moment';

export const formatTask = (t) => {
  const sTime = moment(t.start.dateTime);
  const eTime = moment(t.end.dateTime);
  return {
    _id: t.id,
    title: t.summary,
    date: moment(t.created),
    startTime: {
      hours: sTime.hours(),
      minutes: sTime.minutes(),
    },
    endTime: t.endTimeUnspecified ? null : {
      hours: eTime.hours(),
      minutes: eTime.minutes(),
    },
    completed: false,
    ...readMetaData(t.description),
  };
}

const readMetaData = (desc) => {
  const m = desc.match(/&&meta:{.*}&&/);
  if (!m) {
    return { description: desc };
  }
  const data = JSON.parse(m[0].slice(7, -2));
  return { ...data, description: desc.replace(/&&meta:{.*}&&/, '') };
}