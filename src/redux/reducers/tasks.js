import db from '../db';
import Api from '../../services/api';

const taskTable = db.table('tasks');
const categoryTable = db.table('categories');

const initialState = {
  items: [],
  categories: [{
    _id: 'default_category',
    name: '',
    color: '#ffffff',
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
    case 'UPDATE_CATEGORY':
      return updateCategory(state, action);
    default:
      return state;
  }
}

const updateCategory = (state, action) => {
  categoryTable.put(action.category);
  const index = state.categories.findIndex(c => c._id === action.category._id);
  return {
    ...state,
    categories: [
      ...state.categories.slice(0, index),
      action.category,
      ...state.categories.slice(index + 1),
    ]
  }
}

const completeTask = (state, action) => {
  const index = state.items.findIndex(t => t._id === action.id);
  const task = state.items[index];
  if (!task.fromGoogle) {
    taskTable.put({
      ...task,
      completed: action.completed,
      date: task.date.valueOf()
    });
  } else {
    Api().updateTask({
      ...task,
      completed: action.completed,
      date: task.date.valueOf()
    });
  }
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
    category: action.task.category._id || action.task.category,
  };
  if (!task.fromGoogle) {
    taskTable.put({
      ...task,
      date: action.task.date.valueOf(),
    });
  } else {
    Api().updateTask(task);
  }

  const i = state.items.findIndex(t => t._id === task._id);
  let items = action.id ?
  [
    ...state.items.slice(0, i),
    task,
    ...state.items.slice(i+1),
  ]
  : [ ...state.items, task ]
  return {
    ...state,
    items,
    categories: createCategory(state, action.task.category),
  };
}

const createCategory = (state, category) => {
  if (category.name) {
    categoryTable.put(category);
    return [
      ...state.categories,
      category,
    ];
  }
  return state.categories;
};

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
  const cats = action.categories.find(c => c._id === 'default_category') ?
    action.categories :
    [
      ...state.categories,
      ...action.categories,
    ];
  return {
    ...state,
    categories: cats,
  };
}