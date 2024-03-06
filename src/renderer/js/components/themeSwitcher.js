import { LitElement, css, html } from 'lit-element';
export class ThemeSwitcher extends LitElement {

    static get properties() {
        return {
            options: {
                type: Array
            }
        }
    }

    constructor() {
        super()
        this.options = ['default']
        this.themeSheet = document.querySelector('#themeSheet')
    }

    connectedCallback() {
        super.connectedCallback();

    }

    firstUpdated() {
        super.firstUpdated();
        this.themeSwitcher = this.shadowRoot.querySelector('#themeSwitcher')
        this.setTheme()
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    render() {
        return html`<div class="container">
        <select id="themeSwitcher" @change="${() => {
                window.api.set('theme', this.themeSwitcher.value)
                this.setTheme()
            }}">
        ${this.options.map(option => html`<option value=${option}>${option}</option>`)}
        </select>
        </div>
    `
    }

    async setTheme() {
        const theme = await window.api.get('theme') || 'default'
        this.themeSheet.setAttribute('href', `../assets/styles/themes/${theme}.css`)
        this.themeSwitcher.value = theme
    }

    setOptions(options) {
        this.options = options
        this.requestUpdate()
    }


    static get styles() {
        return css`
          .container {
            position: absolute;
            left: 2rem;
            top: 2rem;
            width: 5rem;
            height: 3rem;
            border-radius: 0.5rem;
        }

        select {
            width: 100%;
            height: 100%;
            border-radius: 0.5rem;
            background-color: blue;
            background-color: #e7e7e7;
            box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
            text-align: center;
        }
        
    `
    }
}

window.customElements.define('theme-switcher', ThemeSwitcher);