import { ipcMain } from 'electron';
import path from 'path';
import app from '../index.js';
import { dataManagement } from '../utils/dataManagement';
import { profileManagement } from '../utils/profileManagement';

const profilesPath = path.join(app.getPath('userData'), 'data/profiles/profiles.json');

export const getBackupSlotsStatuses = ipcMain.handle('get-backup-slots-statuses', (req, uuid) => {
    return new Promise((resolve, reject) => {
        const slotsPath = path.join(app.getPath('userData'), `data/profiles/${uuid}`);

        profileManagement.retrieveProfile(uuid, (err, profile) => {
            if (err) {
                reject(err);
                return;
            } 

            let statusSlots = []
            let slotsAmount = parseInt(profile.slots) + 1
            slotsAmount = slotsAmount > 101 ? 6 : slotsAmount
            slotsAmount = slotsAmount <= 1 ? 6 : slotsAmount

            for (let i = 1; i < slotsAmount; i++) {
                statusSlots.push(dataManagement.pathExists(path.join(slotsPath, `/${i}`)) ? dataManagement.getDateFromPath(path.join(slotsPath, `/${i}`)) : 'Empty')
            }

            resolve(statusSlots)

        })


    })

})

export const backup = ipcMain.handle('backup', (req, uuid, slot) => {
    return new Promise((resolve, reject) => {
        const slotPath = path.join(app.getPath('userData'), `data/profiles/${uuid}/${slot}`);

        dataManagement.readData(profilesPath, (err, dataToBeParsed) => {
            if (err) {
                reject(err);
                return;
            }
            const data = JSON.parse(dataToBeParsed);
            const index = data.profiles.findIndex(profile => profile.id === uuid)

            if (index !== -1) {
                const location = data.profiles[index].location
                if (dataManagement.pathExists(location)) {
                    
                    dataManagement.ensurePath(slotPath)

                    dataManagement.isDirectory(location, (err, isDirectory) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        if (isDirectory) {
                            dataManagement.copyDirectory(location, slotPath, (err) => {
                                if (err) {
                                    reject(err);
                                    return;
                                }
                                resolve(dataManagement.getDateFromPath(slotPath))
                            })
                        } else {
                            dataManagement.copyFile(location, slotPath, (err) => {
                                if (err) {
                                    reject(err);
                                    return;
                                }
                                resolve(dataManagement.getDateFromPath(slotPath))
                            })
                        }
                    })

                } else {
                    reject(new Error('Path is not valid!'))
                }

            } else {
                reject(new Error('Profile not found'))
            }

        })

    })
})