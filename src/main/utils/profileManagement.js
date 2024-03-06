import path from 'path';
import app from '../index.js';
import { dataManagement } from "./dataManagement";

const profilesPath = path.join(app.getPath('userData'), 'data/profiles/profiles.json');
class ProfileManagement {

    retrieveProfile(uuid, callback) {
        dataManagement.readData(profilesPath, (err, dataToBeParsed) => {
            if (err) return callback(err);

            const data = JSON.parse(dataToBeParsed);
            const index = data.profiles.findIndex(profile => profile.id === uuid)

            if (index !== -1) {
                return callback(null, data.profiles[index])
            } else {
                return callback(new Error('Profile not found'))
            }


        })
    }

}

const profileManagement = new ProfileManagement();
export { profileManagement };

