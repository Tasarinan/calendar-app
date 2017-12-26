const {app, BrowserWindow, ipcMain} = require('electron');
const electron = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let win;

function createWindow() {
  const screen = electron.screen.getPrimaryDisplay().size;
  win = new BrowserWindow({width: screen.width, height: screen.height});
  win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

  // win.webContents.openDevTools();
  win.on('closed', () => { win = null; });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('active', () => {
  if (win == null) {
    createWindow();
  }
});

ipcMain.on('focusWindow', (e, args) => {
  app.focus();
  win.focus();
});