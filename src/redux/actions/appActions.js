import Api from '../../services/api';

export const saveSettings = (settings, dontSaveToDb) => ({
  type: 'SAVE_SETTINGS',
  settings,
  dontSaveToDb
});

export const login = (token, dontSaveToDb) => ({
  type: 'LOGIN',
  token,
  dontSaveToDb,
});

export const logout = () => ({
  type: 'LOGOUT'
});

export const loadCalendars = () => (dispatch) => 
  Api()
    .getCalendars()
    .then(calendars => 
      dispatch({
        type: 'LOAD_CALENDARS',
        calendars
      })
    );

export const showError = (error) => ({
  type: 'SHOW_ERROR',
  error,
});

export const hideError = () => ({ type: 'HIDE_ERROR' });
