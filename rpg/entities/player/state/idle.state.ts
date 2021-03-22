import { State } from '../../../state-machine/state';
import { PlayerControllerInput } from '../player.input';
import { PlayerStateMachine } from '../player.fsm';

export class IdleState extends State {
    constructor() {
        super();
    }

    get name(): string {
        return 'idle';
    }

    public enter(previousState: State): void {
        const action = (this.parent as PlayerStateMachine).proxy.animations['idle'].action;

        if (previousState) {
            const previousAction = (this.parent as PlayerStateMachine).proxy.animations[previousState.name].action;

            action.time = 0.0;
            action.enabled = true;
            action.setEffectiveTimeScale(1.0);
            action.setEffectiveWeight(1.0);
            action.crossFadeFrom(previousAction, 0.25, true);
            action.play();
        } else {
            action.play();
        }
    }

    public update(_timeElapsed: number, input: PlayerControllerInput): void {
        if (input.keys.up || input.keys.down) {
            this.parent.setState('walk');
        } else if (input.keys.space) {
            // this.parent.setState('attack');
        }
    }

    public exit(): void {
        // do nothing
    }
}
