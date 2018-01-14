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