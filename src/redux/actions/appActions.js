export const saveSettings = (settings, dontSaveToDb) => ({
  type: 'SAVE_SETTINGS',
  settings,
  dontSaveToDb
});

export const login = (user, token, dontSaveToDb) => ({
  type: 'LOGIN',
  user,
  token,
  dontSaveToDb,
});

export const logout = () => ({
  type: 'LOGOUT'
});