import { FiniteStateMachine } from './fsm';

export abstract class State {
    protected parent: FiniteStateMachine;

    constructor() {}

    public init(parent: FiniteStateMachine) {
        this.parent = parent;
    }

    public abstract get name(): string;

    public abstract enter(previousState: State): void;

    public abstract update(): void;

    public abstract exit(): void;
}
