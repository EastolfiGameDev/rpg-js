import { SocketEvent } from 'core/events/socket.event';

import { Client } from '../client/client';

import { FiniteStateMachine, OnLoginFunction } from './fsm';
import { LoginAwait } from './login.state';

export class LoginClient {
    private fsm: FiniteStateMachine;
    private onLogin: OnLoginFunction;

    constructor(client: Client, onLogin: OnLoginFunction) {
        this.onLogin = onLogin;

        client.onMessage = (topic: string, data: string) => this.onMessage(topic, data);

        this.fsm = new FiniteStateMachine((event: SocketEvent) => this.onEvent(event));
        this.fsm.setState(new LoginAwait());
    }

    private onEvent(event: SocketEvent): void {
        this.onLogin(event/*.params*/);
    }

    private onMessage(topic: string, data: string): boolean {
        return this.fsm.onMessage(topic, data);
    }
}
