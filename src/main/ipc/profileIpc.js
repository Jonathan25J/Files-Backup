import { ipcMain } from 'electron';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { dataManagement } from '../utils/dataManagement';

export const getProfiles = ipcMain.handle('get-profiles', () => {
    return new Promise((resolve, reject) => {
        const profilesPath = path.join(path.resolve(), 'resources/profiles/profiles.json');
        dataManagement.readData(profilesPath, (err, dataToBeParsed) => {
            if (err) {
                reject(err);
                return;
            }
            const data = JSON.parse(dataToBeParsed);
            resolve(data);
        });
    });

})

export const createProfileUuid = ipcMain.handle('create-profile-uuid', () => {
       return {id: uuidv4()}
    })


