import { Broadcast } from '../event/broadcast';

const accountInput = 'login-input';
const logginButton = 'login-button';

const template = `
<div class="ui" id="login-ui">
    <div class="login-screen">
    <div class="login-screen-layout">
        <div class="login-screen-layout window">
        <div class="login-text">Account Name</div>
        <input class="login-input" id="${accountInput}" maxlength="64" type="text"></input>
        <button class="login-button" id="${logginButton}">Login</button>
        </div>
    </div>
    </div>
</div>`;

class LoginComponent extends HTMLElement {
    public connectedCallback() {
        this.innerHTML = template;

        document.getElementById(logginButton).onclick = () => {
            Broadcast.emit('login.commit');
        };
    }
}

export function getAccountName(): string {
    return (document.getElementById(accountInput) as HTMLInputElement).value;
}

customElements.define('login-component', LoginComponent);
