import { State } from './state';

export class FiniteStateMachine {
    private states: { [name: string]: State } = {};
    private _currentState: State = null;

    public setState(name: string): void {
        const previousState = this._currentState;

        if (previousState) {
            // If we are trying to enter the current state, do nothing
            if (previousState.name === name) {
                return;
            }

            previousState.exit();
        }

        const state = this.states[name];
        state.init(this);

        this._currentState = state;
        state.enter(previousState);
    }

    public get currentState(): State {
        return this._currentState;
    }

    protected addState(name: string, state: State): void {
        this.states[name] = state;
    }
}
