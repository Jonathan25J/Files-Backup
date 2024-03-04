import { ipcMain } from 'electron';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { dataManagement } from '../utils/dataManagement';

const profilesPath = path.join(path.resolve(), 'resources/profiles/profiles.json');

export const getProfiles = ipcMain.handle('get-profiles', () => {
    return new Promise((resolve, reject) => {
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
    return { id: uuidv4() }
})

export const addProfile = ipcMain.handle('add-profile', (req, profile) => {
    return new Promise((resolve, reject) => {
        dataManagement.readData(profilesPath, (err, dataToBeParsed) => {
            if (err) {
                reject(err);
                return;
            }
            const data = JSON.parse(dataToBeParsed);
            data.profiles.push(profile);
            dataManagement.writeData(profilesPath, JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            })


        });
    });

})

export const updateProfile = ipcMain.handle('update-profile', (req, body) => {
    return new Promise((resolve, reject) => {
        dataManagement.readData(profilesPath, (err, dataToBeParsed) => {
            if (err) {
                reject(err);
                return;
            }
            const data = JSON.parse(dataToBeParsed);
            const index = data.profiles.findIndex(profile => profile.id === body.id)
            let profile = body

            if (index !== -1) {
                data.profiles[index] = profile
                dataManagement.writeData(profilesPath, JSON.stringify(data, null, 2), (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                })

            } else {
                reject(new Error('Profile not found'))
            }
        });
    });
})


export const removeProfile = ipcMain.handle('remove-profile', (req, uuid) => {
    return new Promise((resolve, reject) => {
        dataManagement.readData(profilesPath, (err, dataToBeParsed) => {
            if (err) {
                reject(err);
                return;
            }
            const data = JSON.parse(dataToBeParsed);
            const index = data.profiles.findIndex(profile => profile.id === uuid)

            if (index !== -1) {
                data.profiles.splice(index, 1)
                dataManagement.writeData(profilesPath, JSON.stringify(data, null, 2), (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    const profilePath = path.join(path.resolve(), `resources/profiles/${uuid}`)
                    dataManagement.removePath(profilePath)
                    resolve();
                })

            } else {
                reject(new Error('Profile not found'))
            }
        });
    });

})

