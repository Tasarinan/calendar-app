export const saveSettings = (settings, dontSaveToDb) => ({
  type: 'SAVE_SETTINGS',
  settings,
  dontSaveToDb
});