const {app, BrowserWindow} = require('electron');
const electron = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow() {
  const screen = electron.screen.getPrimaryDisplay().size;
  win = new BrowserWindow({width: screen.width, height: screen.height});
  win.loadURL('http://localhost:3000');

  //win.webContents.openDevTools();

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
