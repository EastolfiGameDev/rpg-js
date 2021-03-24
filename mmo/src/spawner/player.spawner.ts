import { PerspectiveCamera, Scene } from 'three';

import { Entity } from 'core/entities/entity';
import { EntityManager } from 'core/entities/entity.manager';
import { ThreeJSController } from 'core/game/three-js.controller';
import { Component } from 'core/entities/component';

import { ThirdPersonCamera } from 'rpg/entities/camera/third-person.camera';
import { PlayerEntity } from 'rpg/entities/player/player.entity';

import { UIController } from '../ui/ui.controller';

export class PlayerSpawner extends Component {
    constructor(/*params: {
        grid: this.grid_,
        scene: Scene,
        camera: PerspectiveCamera,
    }*/) {
        super();
    }

    public initComponent(): void {
        //
    }
    public initEntity(): void {
        // do nothing
    }
    public destroy(): void {
        // do nothing
    }

    public spawn(description: string): Entity {
        const entityManager = EntityManager.instance;

        const player = new PlayerEntity();
        entityManager.add(player, 'player');

        const { camera } = entityManager.get('threejs').getComponent('ThreeJSController') as ThreeJSController;

        const thirdPersonCamera = new Entity();
        thirdPersonCamera.addComponent(new ThirdPersonCamera({
            camera,
            target: player
        }));
        entityManager.add(thirdPersonCamera, 'player-camera');

        // to controller
        (this.findEntity('ui').getComponent('UIController') as UIController).fadeOutLogin();

        return player;
    }

    public update(_timeElapsed: number): void {
        // throw new Error('Method not implemented.');
    }
}
