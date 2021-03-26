import { Entity } from '../entity';
import { PlayerController, PlayerParams } from './player.controller';


export class PlayerEntity extends Entity {
    constructor(params: PlayerParams) {
        super();

        this.init(params);
    }

    private init(params: PlayerParams): void {
        this.addComponent(new PlayerController(params))
    }
}
