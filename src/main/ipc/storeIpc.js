import { ipcMain } from 'electron';
import Store from 'electron-store';
const store = new Store()

export const set = ipcMain.handle('store', (req, location, value) => {
        store.set(location, value)
})

export const get = ipcMain.handle('get', (req, location) => {
    return store.get(location)
})