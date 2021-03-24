import './chat.component';

import { addWebComponent, WebComponentFactory } from '../factory';

// IDs
const uiContainer = 'game-ui';

addWebComponent((factory: WebComponentFactory) => {
    const template = `
    <div class="ui" id="${uiContainer}">
        <chat-component></chat-component>
    </div>`;
    // <gui-component></gui-component>
    // <quests-component></quests-component>
    // <stats-component></stats-component>
    // <inventory-component></inventory-component>

    class GameUIComponent extends HTMLElement {
        public connectedCallback() {
            this.innerHTML = template;
        }
    }

    factory('game-ui-component', GameUIComponent);
});

export function show(): string {
    return document.getElementById(uiContainer).style.visibility = 'visible';
}

export function hide(): string {
    return document.getElementById(uiContainer).style.visibility = 'hidden';
}
