import { PlayerControllerInput } from '../entities/player/player.input';
import { FiniteStateMachine } from './fsm';

export abstract class State {
    protected parent: FiniteStateMachine;

    constructor() {}

    public init(parent: FiniteStateMachine) {
        this.parent = parent;
    }

    public abstract get name(): string;

    public abstract enter(previousState: State): void;

    public abstract update(timeElapsed: number, input: PlayerControllerInput): void;

    public abstract exit(): void;
}
