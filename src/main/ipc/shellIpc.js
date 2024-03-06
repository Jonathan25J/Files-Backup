import { ipcMain, shell } from 'electron';

export const shellOpenPath = ipcMain.handle('shell-open-path', (req, path) => {
    shell.openPath(path)
})