import { LitElement, css, html } from 'lit-element';
import './profile.js';
export class ProfilesHolder extends LitElement {

    static get properties() {
        return {
            profiles: {
                type: Array, attribute: false
            }
        }
    }

    constructor() {
        super()
        this.profiles = []
    }

    connectedCallback() {
        super.connectedCallback()
    }

    firstUpdated() {
        super.firstUpdated()
        this._fetchProfiles()
    }

    disconnectedCallback() {
        super.disconnectedCallback()
    }

    render() {
        return html`<div class="container">
        <div class="menu">
        <a href="" @click="${this._addProfile}" class="add-btn">
         <img src="../../assets/images/icons/add-btn.png" alt="Add profile">
         </a>
        </div>
        <div class="profiles">
        ${this.profiles.map(profile => html`${profile}`)}
        </div>
        </div>
    `
    }

    async _fetchProfiles() {
        const data = await window.api.getProfiles()
        data.profiles.forEach(profile => {
            const widget = document.createElement('profile-widget');
            widget.setAttribute('id', profile.id);
            widget.setAttribute('name', profile.name);
            widget.setAttribute('location', profile.location);
            widget.setAttribute('slots', profile.slots);
            this.profiles = [...this.profiles, widget]
        });
    }

    async _addProfile(e) {
        e.preventDefault();
        const profile = document.createElement('profile-widget');
        const data = await window.api.createProfileUuid()
        profile.setAttribute('id', data.id);
        profile.setAttribute('new', '');
        this.profiles = [...this.profiles, profile]
    }


    static get styles() {
        return css`
         .container {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            background-color: var(--menu-background-color);
            border-radius: 0.5rem;
        }

        .menu {
            display: flex;
            justify-content: flex-end;
            background-color: var(--menu-background-color);
            border-radius: 0.5rem;
            position: sticky;
            top: 0;
            z-index: 5;
        }

        .add-btn {
            display: block;
            width: 3rem;
            height: 3rem;
            margin: 1rem;
        }

        .add-btn img {
           height: 100%;
           width: 100%;
        }

        .profiles {
            display: flex;
            align-items: center;
            flex-direction: column;
            z-index: 0;
            flex: 1;
            overflow-y: auto;
            scrollbar-color: lightblue transparent;
            scrollbar-gutter: stable both-edges;
        }

        profile-widget {
            display: flex;
            flex-shrink: 0;
            width: 90%;
            height: 20rem;
            padding: 0.5rem;
        }
        
        ::-webkit-scrollbar {
        width: 12px; 
        }

        ::-webkit-scrollbar-thumb {
        background: #dbdddd; 
        }

        ::-webkit-scrollbar-track {
        background: transparent; 
        }


        @media (min-width: 1280px) {
            profile-widget {
                height: 6rem;
            }

        }


        
    `
    }
}

window.customElements.define('profiles-holder', ProfilesHolder)