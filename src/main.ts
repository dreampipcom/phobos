/* eslint @typescript-eslint/no-require-imports:0 */
import { app, BrowserWindow, dialog } from 'electron';
import path from 'path';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('web+dreampip', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('web+dreampip')
}

const MAIN_WINDOW_VITE_DEV_SERVER_URL = 'http://localhost:3000';

const gotTheLock = true || app.requestSingleInstanceLock()

let mainWindow

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  return mainWindow
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};


// Create mainWindow, load the rest of the app, etc...
app.whenReady().then(() => {
  var mainWindow = createWindow()

  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
          // the commandLine is array of strings in which last element is deep link url
      dialog.showErrorBox('Welcome Back', `You arrived from: ${commandLine.pop()}`)
      mainWindow.loadURL(commandLine.pop().replace('web+dreampip://', 'http://'))
    }
  })

  // Handle the protocol. In this case, we choose to show an Error Box.
  app.on('open-url', (event, url) => {
    dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)

    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
          // the commandLine is array of strings in which last element is deep link url
      // dialog.showErrorBox('Welcome Back', `You arrived from: ${commandLine.pop()}`)
      mainWindow.loadURL(url.replace('web+dreampip://', 'http://'))
    }
  })

})


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow =createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
