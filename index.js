const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
  const browserWindow = new BrowserWindow();
  const entryPageUrl = `file://${__dirname}/index.html`;
  // const entryPageUrl = 'http://github.com';
  browserWindow.loadURL(entryPageUrl);
});
