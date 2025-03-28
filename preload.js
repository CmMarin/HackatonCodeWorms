const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  navigateTo: (page) => ipcRenderer.send('navigate-to', page),
  sendNote: (data) => ipcRenderer.send('save-note', data),
  receive: (channel, callback) => {
    ipcRenderer.on(channel, (event, ...args) => callback(...args))
  }
})