import { State } from '../../../state-machine/state';
import { PlayerControllerInput } from '../player.input';
import { PlayerStateMachine } from '../player.fsm';

export class WalkState extends State {
    constructor() {
        super();
    }

    get name(): string {
        return 'walk';
    }

    public enter(previousState: State): void {
        const action = (this.parent as PlayerStateMachine).proxy.animations['walk'].action;

        if (previousState) {
            const previousAction = (this.parent as PlayerStateMachine).proxy.animations[previousState.name].action;

            action.enabled = true;

            if (previousState.name === 'run') {
                const ratio = action.getClip().duration / previousAction.getClip().duration;
                action.time = previousAction.time * ratio;
            } else {
                action.time = 0.0;
                action.setEffectiveTimeScale(1.0);
                action.setEffectiveWeight(1.0);
            }

            action.crossFadeFrom(previousAction, 0.1, true);
            action.play();
        } else {
            action.play();
        }
    }

    public update(_timeElapsed: number, input: PlayerControllerInput): void {
        if (input.keys.up || input.keys.down) {
            if (input.keys.shift) {
                this.parent.setState('run');
            }
        } else {
            this.parent.setState('idle');
        }
    }

    public exit(): void {
        // do nothing
    }
}
