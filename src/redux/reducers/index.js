import { combineReducers } from 'redux';
import calendar from './calendar';
import sidepanel from './sidepanel';

export default combineReducers({
  calendar,
  sidepanel,
});