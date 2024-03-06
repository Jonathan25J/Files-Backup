import { LitElement, css, html } from 'lit-element';
import '../buttonModal.js';
import '../modal.js';
export class Profile extends LitElement {

    static get properties() {
        return {
            id: {
                type: String
            },
            name: {
                type: String
            },
            location: {
                type: String
            },
            slots: {
                type: Number
            }
        }
    }

    constructor() {
        super()
        this.name = ''
        this.location = ''
        this.slots = 5
    }

    connectedCallback() {
        super.connectedCallback()
    }

    firstUpdated() {
        super.firstUpdated()
    }

    disconnectedCallback() {
        super.disconnectedCallback()
    }

    render() {
        return html`<div class="container">
        <div class="items">
        <div class="remove">
        <a href="" @click="${this._removeModal}" class="add-btn">
        <img src="../../assets/images/icons/remove-btn.png" alt="Remove profile">
        </a>
        </div>
        <div class="name" @change="${this._patchOrPostProfile}">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" value="${this.name}">
        </div>
        <div class="location" @change="${this._patchOrPostProfile}">
        <label for="location">Location</label>
        <input type="text" id="location" name="location" value="${this.location}">
        </div>
        <div class="slots" @change="${this._patchOrPostProfile}">
        <label for="slots">Slots</label>
        <input type="number" id="slots" name="slots" min=0 max=100 value="${this.slots}">
        </div>
        <div class="restore-backup">
        <div class="restore">
        <a href="" @click="${this._restoreWindows}" class="add-btn">
        <img src="../../assets/images/icons/restore-btn.png" alt="Restore files">
        </a>
        </div>
        <div class="backup">
        <a href="" @click="${this._backupModal}" class="add-btn">
        <img src="../../assets/images/icons/backup-btn.png" alt="Backup files">
        </a>
        </div>
        </div>
        </div>
        </div>
    `
    }

    _patchOrPostProfile() {
        let profile = {
            id: this.id,
            name: this.shadowRoot.querySelector('#name').value,
            location: this.shadowRoot.querySelector('#location').value,
            slots: this.shadowRoot.querySelector('#slots').value
        }

        if (this.getAttribute('new') != null) {
            window.api.addProfile(profile)
            this.removeAttribute('new')
        } else {
            window.api.updateProfile(profile)
        }
    }

    _removeModal(e) {
        e.preventDefault();
        const modal = document.createElement('modal-widget')
        modal.setPrompt("delete profile", "Are you sure you want to delete this profile?", this._deleteProfile.bind(this))
    }

    _deleteProfile() {
        const modal = document.querySelector('modal-widget')
        if (this.getAttribute('new') == null) {
            window.api.removeProfile(this.id).then((err) => {
                if (err == null) {
                    modal.remove()
                    this.remove()
                }
            })
        } else {
            modal.remove()
            this.remove()
        }
    }

    async _restoreWindows(e) {
        e.preventDefault();
        const location = this.shadowRoot.querySelector('#location').value;
        if (await window.api.pathExists(location)) {
            window.api.openPath(location);
        }
    
        const profileFolder = await window.api.getProfileFolder(this.id);
        if (await window.api.pathExists(profileFolder)) {
            window.api.openPath(profileFolder);
        }
    }

    _backupModal(e) {
        e.preventDefault();
        const buttonModal = document.createElement('button-modal')
        buttonModal.setAttribute('title', 'backup-slots')
        window.api.getBackupSlotsStatuses(this.id).then((statuses) => {
            let buttons = []
            let index = 1
            statuses.forEach((status) => {
                let currentIndex = index
                buttons[index] = { color: "", status: status, function: () => this._createBackup(this.id, currentIndex) }
                index++
            })
            buttonModal.createButtons(buttons)
        })


    }

    _createBackup(id, slot) {
        let buttonModal = document.querySelector('button-modal')
        let slotMessage = buttonModal.shadowRoot.querySelector(`#backup-slots-${slot}`).querySelector('p')
        window.api.backup(id, slot).then((status) => {
            slotMessage.innerHTML = status
        }).catch((error) => {
            // electron's fault
            slotMessage.innerHTML = error.message.split(':')[2].trim()
        })
    }

    static get styles() {
        return css`
         .container {
            height: 100%;
            width: 100%;
            background-color: #b1b0b0;
            border-radius: 0.5rem;

        }

        .items {
            display: flex;
            height: 100%;
            width: 100%;
            justify-content: space-evenly;
            align-items: center;
            flex-direction: column;
            gap: 0.5rem;
        }

        img {
            display: block;
            width: 3rem;
            height: 3rem;
        }

        .name, .location, .slots {
            display: flex;
            gap: 1rem;
        }
        
        input {
            text-align: center;
            background: rgb(233 233 233);
            border: none;
            border-radius: 0.5rem;
        }

        .name input {
            width: 7rem;
        }

        .restore-backup {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 25%;
        }
        

        .remove img, .backup img {
            width: 2.5rem;
            height: 2.5rem;
        }

        @media (min-width: 1280px) {
            .items {
                flex-direction: row;
            }

            .restore-backup {
                width: 15%;
            }

        }

        
    `
    }
}

window.customElements.define('profile-widget', Profile)