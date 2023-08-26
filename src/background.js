import { app, protocol, BrowserWindow, Menu, ipcMain, nativeImage } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer';
import path from 'path';

const isDevelopment = process.env.NODE_ENV !== 'production';

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
]);

let mainWindow;

const iconPath = path.join(__dirname, '..', 'src', 'assets', 'PersonIcon.png');
const iconPathMinimized = path.join(__dirname, '..', 'src', 'assets', 'BottomLogo.png');

let isMinimized = false;

const appIcon = nativeImage.createFromPath(iconPath);
const appIconMinimized = nativeImage.createFromPath(iconPathMinimized);

appIcon.setTemplateImage(true);
appIconMinimized.setTemplateImage(true);

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 380,
    minWidth: 380,
    height: 630,
    resizable: true,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  });


  const emptyMenu = Menu.buildFromTemplate([]);
  Menu.setApplicationMenu(emptyMenu);

  mainWindow.on('minimize', () => {
    isMinimized = true;
    mainWindow.setIcon(appIconMinimized);
  });

  mainWindow.on('restore', () => {
    isMinimized = false;
    mainWindow.setIcon(appIconMinimized);
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
  } else {
    createProtocol('app');
    mainWindow.loadURL('app://./index.html');
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }

  createWindow();
});

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
