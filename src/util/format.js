import moment from 'moment';

export const formatTask = (t) => {
  const sTime = moment(t.start.dateTime);
  const eTime = moment(t.end.dateTime);
  const noTime = sTime.isSame(eTime);
  return {
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
    ...readMetaData(t.description),
  };
}

const readMetaData = (desc) => {
  if (!desc) return null;
  const m = desc.match(/&&meta:{.*}&&/);
  if (!m) {
    return { description: desc };
  }
  const data = JSON.parse(m[0].slice(7, -2));
  return { ...data, description: desc.replace(/&&meta:{.*}&&/, '') };
}