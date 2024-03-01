import { ping } from './pingIpc.js'
import { createProfileUuid, getProfiles } from './profileIpc.js'
export const retrieveIpc = () => {
    return {
        ping, getProfiles, createProfileUuid
    }
}