import { addWebComponent, WebComponentFactory } from '../factory';

addWebComponent((factory: WebComponentFactory) => {
    const template = `
    <div class="chat-ui">
        <div class="chat-ui-text-area" id="chat-ui-text-area">
            <input class="chat-text chat-input" id="chat-input" maxLength="64" type="text"></input>
        </div>
    </div>`;

    class ChatComponent extends HTMLElement {
        public connectedCallback() {
            this.innerHTML = template;
        }
    }

    factory('chat-component', ChatComponent);
});
