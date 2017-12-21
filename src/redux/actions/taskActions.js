export const completeTask = (id, reverse) => ({
  type: 'COMPLETE_TASK',
  id,
  completed: !reverse,
});

export const deleteTask = id => ({
  type: 'DELETE_TASK',
  id,
});

export const createTask = task => ({
  type: 'CREATE_TASK',
  task,
});

export const insertTasks = tasks => ({
  type: 'INSERT_TASKS',
  tasks
});

export const insertCategories = categories => ({
  type: 'INSERT_CATEGORIES',
  categories
})