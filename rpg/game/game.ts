import { ThreeJSController } from 'core/game/three-js.controller';
import { Entity } from 'core/entities/entity';
import { EntityManager } from 'core/entities/entity.manager';
import { Game } from 'core/game/game';

import { ThirdPersonCamera } from '../entities/camera/third-person.camera';
import { PlayerEntity } from '../entities/player/player.entity';
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
        this.loadPlayer();
        const world = new WorldManager();
        world.addFoliage();
    }

    protected stepChild(_delta: number): void {
        // do nothing
    }

    private loadPlayer(): void {
        const entityManager = EntityManager.instance;

        const { scene, camera } = entityManager.get('threejs').getComponent('ThreeJSController') as ThreeJSController;

        entityManager.add(new PlayerEntity({ camera, scene }), 'player');

        const thirdPersonCamera = new Entity();
        thirdPersonCamera.addComponent(new ThirdPersonCamera({
            camera,
            target: entityManager.get('player')
        }));
        entityManager.add(thirdPersonCamera, 'player-camera');
    }
}
