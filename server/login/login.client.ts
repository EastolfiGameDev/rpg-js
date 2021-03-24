import { BroadcastParam } from 'core/events/broadcast';

import { Client } from '../client/client';

import { FiniteStateMachine, OnLoginFunction } from './fsm';
import { LoginAwait } from './login.state';

export class LoginClient {
    private fsm: FiniteStateMachine;
    private onLogin: OnLoginFunction;

    constructor(client: Client, onLogin: OnLoginFunction) {
        this.onLogin = onLogin;

        client.onMessage = (topic: string, data: BroadcastParam) => this.onMessage(topic, data);

        this.fsm = new FiniteStateMachine((event: BroadcastParam) => this.onEvent(event));
        this.fsm.setState(new LoginAwait());
    }

    private onEvent(event: BroadcastParam): void {
        this.onLogin(event/*.params*/);
    }

    private onMessage(topic: string, data: BroadcastParam): boolean {
        return this.fsm.onMessage(topic, data);
    }
}
