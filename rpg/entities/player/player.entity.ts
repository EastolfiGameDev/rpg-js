import { Entity } from 'core/entities/entity';

import { PlayerController } from './player.controller';
import { PlayerControllerInput } from './player.input';

export class PlayerEntity extends Entity {
    constructor() {
        super();

        this.init();
    }

    private init(): void {
        this.addComponent(new PlayerControllerInput());
        this.addComponent(new PlayerController())
    }
}
