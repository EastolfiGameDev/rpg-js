import { SpatialHashGrid } from 'core/spatial/spatial-grid';
import { PerspectiveCamera, Scene } from 'three';
import { Entity } from '../../../core/entities/entity';

import { NetworkEntitySpawner } from './network-entity.spawner';
import { PlayerSpawner } from './player.spawner';

export class SpawnController {
    public static createSpawnerEntity(grid: SpatialHashGrid): Entity {
        const spawner = new Entity();

        spawner.addComponent(new PlayerSpawner(grid));
        // spawner.addComponent(new NetworkEntitySpawner({
        //     //
        // }));

        return spawner;
    }
}
