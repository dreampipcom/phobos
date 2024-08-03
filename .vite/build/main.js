'use strict';
const e = require('electron'),
  i = require('path');
require('electron-squirrel-startup') && e.app.quit();
const n = 'http://localhost:3000',
  o = () => {
    new e.BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: { preload: i.join(__dirname, 'preload.js') },
    }).loadURL(n);
  };
e.app.on('ready', o);
e.app.on('window-all-closed', () => {
  process.platform !== 'darwin' && e.app.quit();
});
e.app.on('activate', () => {
  e.BrowserWindow.getAllWindows().length === 0 && o();
});
