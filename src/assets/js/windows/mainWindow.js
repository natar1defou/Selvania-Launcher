"use strict";
const { Menu, app, BrowserWindow } = require("electron");
const path = require("path");
const os = require("os");
let mainWindow = null;

function getWindow() {
    return mainWindow;
}

function destroyWindow() {
    if (!mainWindow) return;
    mainWindow.close();
    mainWindow = null;
}

function createWindow() {
    destroyWindow();
    return new Promise(resolve => {
        mainWindow = new BrowserWindow({
            width: 1280,
            height: 720,
            minWidth: 1280,
            minHeight: 720,
            resizable: true,
            transparent: os.platform() === 'win32',
            frame: os.platform() !== 'win32',
            show: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            },
        });
        // Hide the default menu
        Menu.setApplicationMenu(null);
        mainWindow.setMenuBarVisibility(false);
        mainWindow.loadFile(path.join(app.getAppPath(), 'src', 'launcher.html'));

        mainWindow.once('ready-to-show', () => {
            if (mainWindow) mainWindow.show();
            resolve();
        });
    });
}

module.exports = {
    getWindow,
    createWindow,
    destroyWindow,
};