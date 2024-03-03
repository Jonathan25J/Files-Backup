import { ping } from './pingIpc.js'
import * as profileIpc from './profileIpc.js'
import * as slotsIpc from './slotsIpc.js'
export const retrieveIpc = () => {
    return {
        ping, profileIpc, slotsIpc
    }
}