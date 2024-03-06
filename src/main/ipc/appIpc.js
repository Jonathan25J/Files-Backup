import { ipcMain } from 'electron';
import app from '../index.js';

export const appDirectory = ipcMain.handle('app-directory', () => {
    return app.getPath('userData')
})