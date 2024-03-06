import * as appIpc from './appIpc.js'
import * as pathIpc from './pathIpc.js'
import * as profileIpc from './profileIpc.js'
import * as slotsIpc from './slotsIpc.js'
import * as storeIpc from './storeIpc.js'
export const retrieveIpc = () => {
    return {
        profileIpc, slotsIpc, pathIpc, appIpc, storeIpc
    }
}