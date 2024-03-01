import { LitElement, css, html } from 'lit-element';
export class Profile extends LitElement {

    static get properties() {
        return {
            name: {
                type: String
            },
            location: { 
                type: String 
            }
        }
    }

    constructor() {
        super()
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
        <div class="name">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" value="${this.name}">
        </div>
        <div class="location">
        <label for="location">Location</label>
        <input type="text" id="location" name="location" value="${this.location}">
        </div>
        <div class="restore-backup">
        <div class="restore">
        <a href="" @click="${this._restoreModal}" class="add-btn">
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

    _removeModal(e) {
        e.preventDefault();

    }

    _restoreModal(e) {
        e.preventDefault();

    }

    _backupModal(e) {
        e.preventDefault();

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

        .name, .location {
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

        @media (min-width: 1024px) {
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