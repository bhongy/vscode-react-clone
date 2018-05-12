import { app, ipcMain, BrowserWindow } from 'electron';

const windowsById: Map<number, Electron.BrowserWindow | null> = new Map();

function createWindow() {
  const win = new BrowserWindow();
  const { id } = win;

  windowsById.set(id, win);

  const entryPageUrl = `file://${__dirname}/../index.html`;
  win.loadURL(entryPageUrl);
  win.on('closed', () => {
    windowsById.delete(id);
  });
}

app.on('ready', () => {
  createWindow();
  ipcMain.on('window:create', createWindow);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (windowsById.size === 0) {
    createWindow();
  }
});
