import { combineReducers } from 'redux';
import calendar from './calendar';
import tasks from './tasks';
import app from './app';

export default combineReducers({
  calendar,
  tasks,
  app,
});