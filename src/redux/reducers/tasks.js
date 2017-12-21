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
    case 'CREATE_TASK':
      return createTask(state, action);
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
  taskTable.put({ ...task, completed: action.completed });
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

const createTask = (state, action) => {
  const task = {
    _id: new Date().toISOString(),
    ...action.task,
  };
  taskTable.put(task);
  return {
    ...state,
    items: [
      ...state.items,
      task,
    ],
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