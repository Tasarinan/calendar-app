export const tasksByTime = (t1, t2) => {
  if (t1.startTime && !t2.startTime)
    return -1;
  else if (!t1.startTime && t2.startTime)
    return 1;
  else if (t1.startTime > t2.startTime)
    return 1;
  else if (t1.startTime < t2.startTime)
    return -1;
  return 0;
}