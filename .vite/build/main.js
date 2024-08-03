"use strict";
const electron = require("electron");
const path = require("path");
if (require("electron-squirrel-startup")) {
  electron.app.quit();
}
const MAIN_WINDOW_VITE_DEV_SERVER_URL = "https://alpha.dreampip.com";
const createWindow = () => {
  const mainWindow = new electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });
  {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  }
};
electron.app.on("ready", createWindow);
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.on("activate", () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
