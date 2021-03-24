import { Entity } from 'core/entities/entity';
import { BroadcastParam } from 'core/events/broadcast';
// import { quat, vec3 } from 'gl-matrix';
import { Quaternion, Vector3 } from 'three';

import { Client } from '../client/client';
import { WorldNetworkClient } from './world-network.client';
import { WorldClient } from './world.client';
import { WorldEntity } from './world.entity';

export class WorldManager {
    private ids = 0;
    private entities: WorldClient[] = [];

    public add(client: Client, params: BroadcastParam): void {
        const models = ['sorceror', 'paladin'];
        const randomClass = models[Math.floor(Math.random() * models.length)];

        const entity: WorldEntity = new WorldEntity({
            id: this.ids++,
            position: new Vector3(
            // position: vec3.fromValues(
                -60 + (Math.random() * 2 - 1) * 20,
                0,
                (Math.random() * 2 - 1) * 20
            ),
            // rotation: quat
            rotation: new Quaternion(0, 0, 0, 1),
            character: {
                class: randomClass
            }
        });

        const worldClient = new WorldNetworkClient(client, entity);
        this.entities.push(worldClient);

        // BroadcastChat
    }

    public update(delta: number): void {
        //
    }
}
