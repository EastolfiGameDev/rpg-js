import { BroadcastParam } from 'core/events/broadcast';

import { Client } from '../client/client';
import { LoginClient } from './login.client';

declare type OnLoginFunction = (client: Client, params: BroadcastParam) => void;

export class LoginQueue {
    private clients: { [id: string]: LoginClient } = {};
    private onLogin: OnLoginFunction;

    constructor(onLogin: OnLoginFunction) {
        this.onLogin = onLogin;
    }

    public add(client: Client): void {
        this.clients[client.id] = new LoginClient(client, (event: BroadcastParam) => this.login(client, event));
    }

    public login(client: Client, event: BroadcastParam): void {
        delete this.clients[client.id];

        this.onLogin(client, event);
    }
}
