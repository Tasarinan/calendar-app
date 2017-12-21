import { combineReducers } from 'redux';
import calendar from './calendar';
import sidepanel from './sidepanel';
import tasks from './tasks';
import app from './app';

export default combineReducers({
  calendar,
  sidepanel,
  tasks,
  app,
});