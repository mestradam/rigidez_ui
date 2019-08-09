const electron = require('electron');
const {app, BrowserWindow} = electron;
// const {Menu, globalShortcut} = electron; // to be used later
// const path = require('path');
// const url = require('url');

// Keep a global reference to the main window variable
let mainWindow;

// -----------------------------------------------------------------------------
// Main function to create the window.

function createWindow () {

  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1400, height: 900});

  // Load the index.html file of the app.
  mainWindow.loadFile('index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null
  });
}

// -----------------------------------------------------------------------------
// Methods.

// Create the window then the app is ready
app.on('ready', createWindow );

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
})
