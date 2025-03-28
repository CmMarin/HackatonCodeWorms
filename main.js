const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'))
}

// Add these IPC handlers
ipcMain.on('navigate-to', (_, page) => {
  if (page === 'input') {
    mainWindow.loadFile(path.join(__dirname, 'renderer/input.html'))
  } else {
    mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'))
  }
})

ipcMain.on('save-note', (_, noteData) => {
  mainWindow.webContents.send('new-note', noteData)
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})