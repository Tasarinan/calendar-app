import { orderOptions } from "../../util/constants";
import { login as loginAction } from '../actions/appActions';
import store from '../store';
import db from '../db';
import { createApi, deleteApi } from '../../services/api';

const settingsTable = db.table('settings');
const userDataTable = db.table('user_data');

const defaultSettings = {
  weekStart: 1,
  sidepanelDateFormat: 'Do MMMM YYYY',
  taskDateFormat: 'dddd, MMMM Do, YYYY',
  taskOrder: orderOptions.TIME,
  weekNumberStart: 1,
  showWeeks: true,
  deleteOldTasks: true,
  deleteTasksAfter: {
    count: 1,
    name: 'month',
  },
  showTaskCount: true,
  showWeekTaskCount: true,
  countCompletedTasks: true,
  taskCountCategory: '*',
};

const initialState = {
  loggedIn: false,
  user: null,
  token: null,
  loading: true,
  settings: defaultSettings,
  defaultSettings, // Save defaults in state, NO CHANGES
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'LOADING_STOP':
      return { ...state, loading: false };
    case 'LOADING_START':
      return { ...state, loading: true };
    case 'SAVE_SETTINGS':
      return saveSettings(state, action);
    case 'LOGIN':
      return login(state, action);
    case 'LOGOUT':
      return logout(state);
    default:
      return state;
  }
}

const saveSettings = (state, action) => {
  if (!action.dontSaveToDb) {
    settingsTable.put({
      ...state.settings,
      ...action.settings,
      _id: 'settings_bundle',
    });
  }
  return {
    ...state,
    settings: {
      ...state.settings,
      ...action.settings,
    }
  };
}

const login = (state, action) => {
  let userRev = {};
  let tokenRev = {};
  if (!action.dontSaveToDb) {
    createApi(action.token);
    userDataTable.put({
      ...action.user,
      _id: 'user',
    }).then(r => {
      userRev = r.rev;
      return userDataTable.put({
        ...action.token,
        _id: 'token',
      });
    }).then(r => {
      tokenRev = r.rev;
      store.dispatch(loginAction(
        { ...action.user, _rev: userRev },
        { ...action.token, _rev: tokenRev },
        true,
      ));
    });
    return { ...state };
  }
  return { 
    ...state,
    user: { ...action.user },
    token:{ ...action.token },
    loggedIn: true
  };
}

const logout = (state) => {
  userDataTable.remove('user', state.user._rev)
  userDataTable.remove('token', state.token._rev);
  deleteApi();
  return { 
    ...state,
    user: null,
    token: null,
    loggedIn: false
  };
}
