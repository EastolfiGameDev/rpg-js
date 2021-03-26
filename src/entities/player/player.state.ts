import { FiniteStateMachine } from '../../state-machine/fsm';
import { State } from '../../state-machine/state';

import { PlayerControllerProxy } from './player.controller';

export class PlayerStateMachine extends FiniteStateMachine {
    public proxy: PlayerControllerProxy;

    constructor(proxy: PlayerControllerProxy) {
        super();

        this.proxy = proxy;

        this.init();
    }

    private init(): void {
        this.addState('idle', new IdleState());
    }
}


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

    public update(): void {
        //
    }

    public exit(): void {
        // do nothing
    }
}
