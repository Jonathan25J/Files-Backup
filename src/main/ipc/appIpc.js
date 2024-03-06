import { ipcMain } from 'electron';
import path from 'path';

export const appDirectory = ipcMain.handle('app-directory', () => {
    return path.resolve()
})