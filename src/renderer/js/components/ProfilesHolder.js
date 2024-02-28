import { LitElement, css, html } from 'lit-element';
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
        
        </div>
    `
    }


    static get styles() {
        return css`
         .container {
            height: 100%;
            width: 100%;
            background-color: rgb(79 79 79);
            border-radius: 0.5rem;
            overflow-y: auto;
            scrollbar-color: lightblue transparent;
        }
        
    `
    }
}

window.customElements.define('profiles-holder', ProfilesHolder)