import { addWebComponent, WebComponentFactory } from '../factory';

addWebComponent((factory: WebComponentFactory) => {
    const template = `
    <div class="quest-journal" id="quest-journal"></div>
    <div class="quest-ui-layout" id="quest-ui">
        <div class="quest-ui">
            <div class="quest-text-title" id="quest-text-title"></div>
            <div class="quest-text" id="quest-text"></div>
        </div>
    </div>`;

    class QuestsComponent extends HTMLElement {
        public connectedCallback() {
            this.innerHTML = template;
        }
    }

    factory('quests-component', QuestsComponent);
});
