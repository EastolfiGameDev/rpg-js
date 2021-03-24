import { Game } from 'core/game/game';

import { WorldManager } from './world';

export class RpgGame extends Game {
    constructor() {
        super();
    }

    protected init() {
        super.init();
        super.startGame();
    }

    protected loadSpecificControllers(): void {
        const world = new WorldManager();
        world.addFoliage();
    }

    protected stepChild(_delta: number): void {
        // do nothing
    }
}
