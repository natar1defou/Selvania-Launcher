"use strict";
const electron = require("electron");
const path = require("path");
const os = require("os");
let updateWindow = undefined;

function getWindow() {
    return updateWindow;
}

function destroyWindow() {
    if (!updateWindow) return;
    updateWindow.close();
    updateWindow = undefined;
}

function createWindow() {
    destroyWindow();
    updateWindow = new electron.BrowserWindow({
        width: 400,
        height: 500,
        resizable: false,
        transparent: os.platform() === 'win32',
        frame: os.platform() !== 'win32',
        show: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        },
    });
    electron.Menu.setApplicationMenu(null);
    updateWindow.setMenuBarVisibility(false);
    updateWindow.loadFile(path.join(electron.app.getAppPath(), 'src', 'index.html'));
    updateWindow.webContents.openDevTools()
    updateWindow.once('ready-to-show', () => {
        if (updateWindow) {
            updateWindow.show();
        }
    });
}

module.exports = {
    getWindow,
    createWindow,
    destroyWindow,
};