const { app, ipcMain } = require('electron');
const UpdateWindow = require("./assets/js/windows/updateWindow.js");
const MainWindow = require("./assets/js/windows/mainWindow.js");


const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.whenReady().then(() => {
        UpdateWindow.createWindow();
    });
}

ipcMain.on('update-window-close', () => {
    UpdateWindow.destroyWindow();
})

ipcMain.on('main-window-open', () => {
    MainWindow.createWindow();
})

ipcMain.on('main-window-close', () => {
    MainWindow.destroyWindow();
})



app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
