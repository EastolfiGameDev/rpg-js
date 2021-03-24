import { PerspectiveCamera, Scene } from 'three';
import { Entity } from '../../../core/entities/entity';

import { NetworkEntitySpawner } from './network-entity.spawner';
import { PlayerSpawner } from './player.spawner';

export class SpawnController {
    public static createSpawnerEntity(/*params: {
        grid: this.grid_,
        scene: Scene,
        camera: PerspectiveCamera,
    }*/): Entity {
        const spawner = new Entity();

        spawner.addComponent(new PlayerSpawner());
        // spawner.addComponent(new NetworkEntitySpawner({
        //     //
        // }));

        return spawner;
    }
}
