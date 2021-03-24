import { Broadcast } from 'core/events/broadcast';

import { addWebComponent, WebComponentFactory } from '../factory';

const messagesList = 'chat-ui-text-area';
const messageInput = 'chat-input';

addWebComponent((factory: WebComponentFactory) => {
    const template = `
    <div class="chat-ui">
        <div class="chat-ui-text-area" id="${messagesList}">
            <input class="chat-text chat-input" id="${messageInput}" maxLength="64" type="text"></input>
        </div>
    </div>`;

    class ChatComponent extends HTMLElement {
        public connectedCallback() {
            this.innerHTML = template;

            const chatElement = document.getElementById(messageInput) as HTMLInputElement;

            chatElement.addEventListener('keydown', (event: KeyboardEvent) => {
                if (event.keyCode === 13) {
                    event.preventDefault();

                    const message = chatElement.value;
                    if (message?.trim()) {
                        // improve type
                        Broadcast.emit('send-message.commit', message.trim());
                    }
                }

                event.stopPropagation();
            }, false);
        }
    }

    factory('chat-component', ChatComponent);
});

export function addChatMessage(message: { text: string, server?: boolean, action?: boolean, name?: string }): void {
    const messageContainer = document.createElement('div');

    const classes = [ 'chat-text' ];
    let content = '';

    if (message.server) {
        classes.push('chat-text-server');
    } else if (message.action) {
        classes.push('chat-text-action');
    } else {
        content = `[${ message.name || 'unkwown player' }]: `;
    }

    messageContainer.className = classes.join(' ');
    messageContainer.innerHTML = content + message.text;

    document.getElementById(messagesList).insertBefore(messageContainer, document.getElementById(messageInput));
}
