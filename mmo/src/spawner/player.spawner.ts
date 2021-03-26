// import { PerspectiveCamera, Scene } from 'three';

import { Entity } from 'core/entities/entity';
import { EntityManager } from 'core/entities/entity.manager';
import { ThreeJSController } from 'core/game/three-js.controller';
import { Component } from 'core/entities/component';
import { SpatialGridController } from 'core/spatial/spatial-grid.controller';

import { ThirdPersonCamera } from 'rpg/entities/camera/third-person.camera';
import { PlayerEntity } from 'rpg/entities/player/player.entity';

import { UIController } from '../ui/ui.controller';
import { SpatialHashGrid } from 'core/spatial/spatial-grid';

export class PlayerSpawner extends Component {
    private grid: SpatialHashGrid;

    constructor(grid: SpatialHashGrid) {
        super();

        this.grid = grid;
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

        player.addComponent(new SpatialGridController(this.grid));

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
