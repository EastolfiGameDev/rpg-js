import { Client } from '../client/client';

import { Event, FiniteStateMachine, OnLoginFunction } from './fsm';
import { LoginAwait } from './login.state';

export class LoginClient {
    private fsm: FiniteStateMachine;
    private onLogin: OnLoginFunction;

    constructor(client: Client, onLogin: OnLoginFunction) {
        this.onLogin = onLogin;

        client.onMessage = (topic: string, data: string) => this.onMessage(topic, data);

        this.fsm = new FiniteStateMachine((event: Event) => this.onEvent(event));
        this.fsm.setState(new LoginAwait());
    }

    private onEvent(event: Event): void {
        this.onLogin(event.params);
    }

    private onMessage(topic: string, data: string): boolean {
        return this.fsm.onMessage(topic, data);
    }
}
