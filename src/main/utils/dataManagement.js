import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import { rimraf } from 'rimraf';
import app from '../index.js';
class DataManagement {

    constructor() {
        this.ensureProfilePaths()
    }

    ensureProfilePaths() {
        const profilesPath = path.join(app.getPath('userData'), 'data/profiles/profiles.json')
        if (!fs.existsSync(profilesPath))
            fse.ensureFile(profilesPath).then(() => {
                const defaultJson = {
                    "profiles": []
                }
                fs.writeFileSync(profilesPath, JSON.stringify(defaultJson, null, 2))
            })
    }

    ensurePath(givenPath) {
        fse.ensureDir(givenPath)
    }

    pathExists(path) {
        return fs.existsSync(path);
    }

    isDirectory(path, callback) {
        fs.stat(path, (err, stats) => {
            if (err) {
                callback(err, false);
                return;
            }
            callback(null, stats.isDirectory());
        });
    }

    getDateFromPath(givenPath) {
        try {
            const stats = fs.statSync(givenPath);
            return stats.birthtime.toLocaleString(app.getSystemLocale(), {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
            });
        } catch (err) {
            return undefined;
        }
    }

    removePath(path) {
        rimraf(path);
    }

    async copyDirectory(source, destination, callback) {
        rimraf(path.join(destination), { glob: false }).then(() => {
            fse.ensureDir(destination).then(() => {
                fs.cp(source, destination, { recursive: true }, (err) => {
                    if (err)
                        callback(err)

                    callback()
                })
            })
        })
    }

    copyFile(source, destination, callback) {
        rimraf(path.join(destination), { glob: false }).then(() => {
            fse.ensureDir(destination).then(() => {
                const fileName = path.basename(source);
                fs.cp(source, path.join(destination, fileName), (err) => {
                    if (err)
                        callback(err)
                    callback()
                })
            })
        })
    }

    readData(filePath, callback) {
        fs.readFile(filePath, { encoding: 'utf8', flag: 'r' }, (err, data) => {
            if (err) {
                return callback(err);
            }

            callback(null, data);
        });
    }

    writeData(filePath, data, callback) {
        fs.writeFile(filePath, data, { encoding: 'utf8', flag: 'w', }, (err) => {
            if (err) {
                return callback(err);
            }

            callback(null);
        });
    }

}
const dataManagement = new DataManagement();
export { dataManagement };

