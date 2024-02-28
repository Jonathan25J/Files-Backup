import { ipcMain } from 'electron';
export const ping = ipcMain.on('ping', () => console.log('pong'))
