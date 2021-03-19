import { PerspectiveCamera, Scene } from 'three';
import { Entity } from '../entity';
import { PlayerController } from './player.controller';
import { PlayerControllerInput } from './player.input';


export class PlayerEntity extends Entity {
    constructor(params: { camera: PerspectiveCamera, scene: Scene }) {
        super();

        this.init(params);
    }

    private init(params: { camera: PerspectiveCamera, scene: Scene }): void {
        this.addComponent(new PlayerControllerInput({ camera: params.camera }));
        this.addComponent(new PlayerController(params))
    }
}
