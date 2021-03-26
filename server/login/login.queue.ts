import { Client } from '../client/client';
import { Event } from './fsm';
import { LoginClient } from './login.client';

declare type OnLoginFunction = (client: Client, params: Event) => void;

export class LoginQueue {
    private clients: { [id: string]: LoginClient } = {};
    private onLogin: OnLoginFunction;

    constructor(onLogin: OnLoginFunction) {
        this.onLogin = onLogin;
    }

    public add(client: Client): void {
        this.clients[client.id] = new LoginClient(client, (event: Event) => this.login(client, event));
    }

    public login(client: Client, event: Event): void {
        this.onLogin(client, event);
    }
}
