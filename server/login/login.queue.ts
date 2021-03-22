import { SocketEvent } from 'core/events/socket.event';

import { Client } from '../client/client';
import { LoginClient } from './login.client';

declare type OnLoginFunction = (client: Client, params: SocketEvent) => void;

export class LoginQueue {
    private clients: { [id: string]: LoginClient } = {};
    private onLogin: OnLoginFunction;

    constructor(onLogin: OnLoginFunction) {
        this.onLogin = onLogin;
    }

    public add(client: Client): void {
        this.clients[client.id] = new LoginClient(client, (event: SocketEvent) => this.login(client, event));
    }

    public login(client: Client, event: SocketEvent): void {
        delete this.clients[client.id];

        this.onLogin(client, event);
    }
}
