import { ping } from './pingIpc.js'
import * as profileIpc from './profileIpc.js'
export const retrieveIpc = () => {
    return {
        ping, profileIpc
    }
}