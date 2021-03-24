import { BroadcastParam } from 'core/events/broadcast';

import { State } from './login.state';

export declare type OnLoginFunction = (event: BroadcastParam) => void;

export class FiniteStateMachine {
    private currentState: State = null;
    private onEvent: OnLoginFunction;

    constructor(onEvent: OnLoginFunction) {
        this.onEvent = onEvent;
    }

    public get state(): State {
        return this.currentState;
    }

    public broadcast(event: BroadcastParam): void {
        this.onEvent(event);
    }

    public onMessage(topic: string, data: BroadcastParam): boolean {
        return this.currentState.onMessage(topic, data);
    }

    public setState(state: State): void {
        const previousState = this.currentState;

        if (previousState) {
            previousState.exit();
        }

        this.currentState = state;
        this.currentState.parent = this;
        state.enter(previousState);
    }
}
