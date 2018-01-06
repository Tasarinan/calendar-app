export const completeTask = (id, reverse) => ({
  type: 'COMPLETE_TASK',
  id,
  completed: !reverse,
});

export const deleteTask = id => ({
  type: 'DELETE_TASK',
  id,
});

export const putTask = (task, id, rev) => ({
  type: 'PUT_TASK',
  task,
  id,
  rev,
});

export const insertTasks = tasks => ({
  type: 'INSERT_TASKS',
  tasks
});

export const insertCategories = categories => ({
  type: 'INSERT_CATEGORIES',
  categories
});

export const updateCategory = category => ({
  type: 'UPDATE_CATEGORY',
  category
});