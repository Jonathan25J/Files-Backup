import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
class DataManagement {

    constructor() {
        this.ensurePaths()
    }

    ensurePaths() {
        const profilesPath = path.join(path.resolve(), 'resources/profiles/profiles.json')
        if (!fs.existsSync(profilesPath))
            fse.ensureFile(profilesPath).then(() => {
                const defaultJson = {
                    "profiles": []
                }
                fs.writeFileSync(profilesPath, JSON.stringify(defaultJson, null, 2))
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
