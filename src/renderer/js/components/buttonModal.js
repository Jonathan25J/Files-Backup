import { LitElement, css, html } from 'lit-element';
import './modal.js';
export class ButtonModal extends LitElement {

    static get properties() {
        return {
            title:{
                type: String
            },
            buttons: {
                type: Object
            }
        }
    }

    constructor() {
        super()
        this.title = ''
        this.buttons = []
    }

    connectedCallback() {
        super.connectedCallback();

    }

    firstUpdated() {
        super.firstUpdated();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    render() {
        return html`<modal-widget title="${this.title}">
        <div class="container">
        <div class="buttons">
        ${this.buttons.map(button => html`${button}`)}
        </div>
        </div>
        </modal-widget>
    `
    }

    createButtons(functionMap) {
        for (let title in functionMap) {
            if (Object.hasOwn(functionMap, title)) {
                // ?style not working?
                const buttonStyle = functionMap[title].color ? `background-color: ${functionMap[title].color};` : '';
                this.buttons = [...this.buttons, html`<button id="b-${this.title.replaceAll(' ', '-')}-${title}" style="${buttonStyle}" @click="${functionMap[title].function}">
                ${title}
                <p>${functionMap[title].status}</p>
                </button>`]
            }
        }
        document.body.append(this)
        this.requestUpdate()
    }


    static get styles() {
        return css`
           .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
            background-color: var(--clr-widget);

            }

            .buttons {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                height: 80%;
                width: 80%;
                gap: 0.5em;
                overflow-y: auto;
            }

            .buttons button {
                height: 30%;
            }

            button {
                appearance: button;
                backface-visibility: hidden;
                background-color: var(--clr-btn);
                border-radius: 6px;
                border-width: 0;
                box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;
                box-sizing: border-box;
                color: #fff;
                cursor: pointer;
                font-family: sans-serif;
                font-size: 100%;
                height: 44px;
                line-height: 1.15;
                outline: none;
                overflow: hidden;
                padding: 0 25px;
                position: relative;
                text-align: center;
                text-transform: none;
                transform: translateZ(0);
                transition: all .2s,box-shadow .08s ease-in;
                user-select: none;
                -webkit-user-select: none;
                touch-action: manipulation;
            }

            ::-webkit-scrollbar {
            width: 12px; 
            }

            ::-webkit-scrollbar-thumb {
            background: var(--clr-widget-dk);
            }

            ::-webkit-scrollbar-track {
            background: transparent; 
            }


            @media (min-width: 475px) {
                .buttons button {
                    height: 10rem;
                    width: 13rem;
                }
            }
        
    `
    }
}

window.customElements.define('button-modal', ButtonModal)