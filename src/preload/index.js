import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

const api = {
  getProfiles: () => ipcRenderer.invoke('get-profiles'),
  createProfileUuid: () => ipcRenderer.invoke('create-profile-uuid'),
  addProfile: (profile) => ipcRenderer.invoke('add-profile', profile),
  updateProfile: (profile) => ipcRenderer.invoke('update-profile', profile),
  removeProfile: (uuid) => ipcRenderer.invoke('remove-profile', uuid),
  getBackupSlotsStatuses: (uuid) => ipcRenderer.invoke('get-backup-slots-statuses', uuid),
  backup: (uuid, slot) => ipcRenderer.invoke('backup', uuid, slot),
  openPath: (path) => ipcRenderer.invoke('shell-open-path', path),
  getProfileFolder: (uuid) => ipcRenderer.invoke('profile-folder', uuid),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
