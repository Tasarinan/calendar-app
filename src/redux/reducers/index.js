import { combineReducers } from 'redux';
import calendar from './calendar';
import sidepanel from './sidepanel';
import tasks from './tasks';

export default combineReducers({
  calendar,
  sidepanel,
  tasks,
});