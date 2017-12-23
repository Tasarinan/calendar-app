import db from '../db';

const taskTable = db.table('tasks');

const initialState = {
  items: [],
  categories: [{
    _id: 'default_category',
    name: '',
    color: 'white',
  }],
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'COMPLETE_TASK':
      return completeTask(state, action);
    case 'DELETE_TASK':
      return deleteTask(state, action);
    case 'PUT_TASK':
      return putTask(state, action);
    case 'INSERT_TASKS':
      return insertTasks(state, action);
    case 'INSERT_CATEGORIES':
      return insertCategories(state, action);
    default:
      return state;
  }
}

const completeTask = (state, action) => {
  const index = state.items.findIndex(t => t._id === action.id);
  const task = state.items[index];
  taskTable.put({
    ...task,
    completed: action.completed,
    date: task.date.valueOf()
  });
  return {
    ...state,
    items: [
      ...state.items.slice(0, index),
      {
        ...task,
        completed: action.completed,
      },
      ...state.items.slice(index+1),
    ]
  };
}

const deleteTask = (state, action) => {
  const index = state.items.findIndex(t => t._id === action.id);
  const { _id, _rev } = state.items[index];
  taskTable.remove(_id, _rev);
  return {
    ...state,
    items: [
      ...state.items.slice(0, index),
      ...state.items.slice(index+1),
    ]
  };
}

const putTask = (state, action) => {
  const task = {
    ...action.task,
    _id: action.id || new Date().toISOString(),
    _rev: action.rev || null,
  };
  taskTable.put({
    ...task,
    date: action.task.date.valueOf(),
  });

  const i = state.items.findIndex(t => t._id === task._id);
  let items = i ?
  [
    ...state.items.slice(0, i),
    task,
    ...state.items.slice(i+1),
  ]
  : [ ...state.items, task ]
  return {
    ...state,
    items,
  };
}

const insertTasks = (state, action) => {
  return {
    ...state,
    items: [
      ...state.items,
      ...action.tasks,
    ],
  };
}

const insertCategories = (state, action) => {
  return {
    ...state,
    categories: [
      ...state.categories,
      ...action.categories,
    ],
  };
}