import { orderOptions } from "../../util/constants";
import db from '../db';

const settingsTable = db.table('settings');

const defaultSettings = {
  weekStart: 1,
  sidepanelDateFormat: 'Do MMMM YYYY',
  taskDateFormat: 'dddd, MMMM Do, YYYY',
  taskOrder: orderOptions.TIME,
  weekNumberStart: 36,
  showWeeks: true,
  deleteOldTasks: true,
  deleteTasksAfter: {
    count: 1,
    name: 'month',
  }
};

const initialState = {
  loading: true,
  settings: defaultSettings,
  defaultSettings, // Save defaults in state, NO CHANGES
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'LOADING_STOP':
      return {
        ...state,
        loading: false,
      };
    case 'LOADING_START':
      return {
        ...state,
        loading: true,
      };
    case 'SAVE_SETTINGS':
      return saveSettings(state, action);
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
