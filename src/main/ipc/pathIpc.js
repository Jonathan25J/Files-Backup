import { ipcMain, shell } from 'electron';
import { dataManagement } from '../utils/dataManagement';

export const openPath = ipcMain.handle('path-open', (req, path) => {
    shell.openPath(path)
})

export const pathExists = ipcMain.handle('path-exists', (req, path) => {
    return dataManagement.pathExists(path)
})