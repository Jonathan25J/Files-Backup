import { ipcMain } from 'electron';
import path from 'path';
import { dataManagement } from '../utils/dataManagement';
import { profileManagement } from '../utils/profileManagement';

const profilesPath = path.join(path.resolve(), 'resources/profiles/profiles.json');

export const getBackupSlotsStatuses = ipcMain.handle('get-backup-slots-statuses', (req, uuid) => {
    return new Promise((resolve, reject) => {
        const slotsPath = path.join(path.resolve(), `resources/profiles/${uuid}`);

        profileManagement.retrieveProfile(uuid, (err, profile) => {
            if (err) reject(err);

            let statusSlots = []
            let slotsAmount = parseInt(profile.slots) + 1
            slotsAmount = slotsAmount > 101 ? 6 : slotsAmount
            slotsAmount = slotsAmount <= 1 ? 6 : slotsAmount

            for (let i = 1; i < slotsAmount; i++) {
                statusSlots.push(dataManagement.pathExists(path.join(slotsPath, `/${i}`)) ? dataManagement.getDateFromPath(slotsPath) : 'Empty')
            }

            resolve(statusSlots)

        })


    })

})

export const backup = ipcMain.handle('backup', (req, uuid, slot) => {
    return new Promise((resolve, reject) => {
        const slotPath = path.join(path.resolve(), `resources/profiles/${uuid}/${slot}`);
        dataManagement.ensurePath(slotPath)

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

                    dataManagement.isDirectory(location, (err, isDirectory) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        if (isDirectory) {
                            dataManagement.copyDirectory(location, slotPath)
                            resolve(dataManagement.getDateFromPath(slotPath))
                        } else {
                            // TODO: making copying file also works
                            // dataManagement.copyFile(location, slotPath)
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