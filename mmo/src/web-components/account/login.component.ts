import { Broadcast } from 'core/events/broadcast';

import { show as showGameUI } from '../ui/game-ui.component';
import { addWebComponent, WebComponentFactory } from '../factory';

// IDs
const loginContainer = 'login-ui';
const accountInput = 'login-input';
const logginButton = 'login-button';

// Classes
const fadedOut = 'fade-out';

addWebComponent((factory: WebComponentFactory) => {
    const template = `
    <div class="ui" id="${loginContainer}">
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

    factory('login-component', LoginComponent);
});

export function getAccountName(): string {
    return (document.getElementById(accountInput) as HTMLInputElement).value;
}

export function fadeOut(): void {
    const container = document.getElementById(loginContainer);

    if (container.classList.contains(fadedOut)) {
        return;
    }

    container.classList.toggle(fadedOut);
    showGameUI();
}
