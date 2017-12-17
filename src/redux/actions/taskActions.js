export const completeTask = (id, reverse) => ({
  type: 'COMPLETE_TASK',
  id,
  completed: !reverse,
});

export const deleteTask = id => ({
  type: 'DELETE_TASK',
  id
});