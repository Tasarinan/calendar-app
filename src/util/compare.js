import { orderOptions } from "./constants";

export default (orderOption) => {
  switch (orderOption) {
    case orderOptions.TIME:
      return tasksByTime;
    case orderOptions.CATEGORY:
      return tasksByCategory;
    case orderOptions.STATUS:
      return tasksByStatus;
    default:
      return () => 0;
  }
}

const tasksByTime = (t1, t2) => {
  if (t1.startTime && !t2.startTime)
    return -1;
  if (!t1.startTime && t2.startTime)
    return 1;
  return compareTime(t1, t2);
}

const tasksByCategory = (t1, t2) => {
  return t1.category.name.localeCompare(t2.category.name);
}

const tasksByStatus = (t1, t2) => {
  if (t1.completed === t2.completed)
    return 0;
  if (t1.completed && !t2.completed)
    return 1;
  return -1;
}

const compareTime = (t1, t2) => {
  if (t1.hours > t2.hours)
    return 1;
  if (t1.hours < t2.hours)
    return -1;
  if (t1.minutes > t2.minutes)
    return 1;
  if (t1.minutes < t2.minutes)
    return -1;
  return 0;
}