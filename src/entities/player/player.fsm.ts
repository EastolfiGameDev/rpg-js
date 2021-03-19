import { FiniteStateMachine } from '../../state-machine/fsm';

import { PlayerControllerProxy } from './player.controller';
import { IdleState } from './state/idle.state';
import { RunState } from './state/run.state';
import { WalkState } from './state/walk.state';

export class PlayerStateMachine extends FiniteStateMachine {
    public proxy: PlayerControllerProxy;

    constructor(proxy: PlayerControllerProxy) {
        super();

        this.proxy = proxy;

        this.init();
    }

    private init(): void {
        this.addState('idle', new IdleState());
        this.addState('walk', new WalkState());
        this.addState('run', new RunState());
    }
}
