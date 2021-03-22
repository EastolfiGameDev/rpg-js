import { Broadcast } from '../event/broadcast';
import { show as showGameUI } from './game-ui.component';

// IDs
const container = 'login-ui';
const accountInput = 'login-input';
const logginButton = 'login-button';

// Classes
const fadedOut = 'fade-out';

const template = `
<div class="ui" id="${container}">
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

export function fadeOut(): void {
    const loginContainer = document.getElementById(container);

    if (loginContainer.classList.contains(fadedOut)) {
        return;
    }

    loginContainer.classList.toggle(fadedOut);
    showGameUI();
}

customElements.define('login-component', LoginComponent);
