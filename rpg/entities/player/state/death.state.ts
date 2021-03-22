import { LoopOnce } from 'three';
import { State } from '../../../state-machine/state';
import { PlayerControllerInput } from '../player.input';
import { PlayerStateMachine } from '../player.fsm';

export class DeathState extends State {
    constructor() {
        super();
    }

    get name(): string {
        return 'death';
    }

    public enter(previousState: State): void {
        const action = (this.parent as PlayerStateMachine).proxy.animations['death'].action;

        if (previousState) {
            const previousAction = (this.parent as PlayerStateMachine).proxy.animations[previousState.name].action;

            action.reset();
            action.setLoop(LoopOnce, 1);
            action.clampWhenFinished = true;
            action.crossFadeFrom(previousAction, 0.2, true);
            action.play();
        } else {
            action.play();
        }
    }

    public update(_timeElapsed: number, _input: PlayerControllerInput): void {
        // do nothing
    }

    public exit(): void {
        // do nothing
    }
}
