// import { quat, vec3 } from 'gl-matrix';
import { Quaternion, Vector3 } from 'three';

import { BroadcastParam } from 'core/events/broadcast';
import { SpatialHashGrid } from 'core/spatial/spatial-grid';

import { Client } from '../client/client';
import { WorldNetworkClient } from './world-network.client';
import { WorldClient } from './world.client';
import { WorldEntity } from './world.entity';

const TICK_RATE = 0.1;

export class WorldManager {
    private ids = 0;
    private entities: WorldClient[] = [];
    // private spawners = [];
    private tickTimer = 0.0;
    private grid = new SpatialHashGrid([[-4000, -4000], [4000, 4000]], [1000, 1000]);

    constructor() {
        // terrain
    }

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
            grid: this.grid,
            account: {
                name: 'Manolo'
            },
            character: {
                class: randomClass
            }
        });

        const worldClient = new WorldNetworkClient(client, entity);
        this.entities.push(worldClient);

        // BroadcastChat
    }

    public update(delta: number): void {
        this.tickClientState(delta);
        this.updateSpawners(delta);
        this.updateEntities(delta);
    }

    private tickClientState(delta: number): void {
        this.tickTimer += delta;

        if (this.tickTimer < TICK_RATE) {
            return;
        }

        this.tickTimer = 0.0;

        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[0];
            if (entity instanceof WorldNetworkClient) {
                entity.updateClientState();
                // this.entities[i].
            }
        }
    }

    private updateSpawners(delta: number): void {
        //
    }

    private updateEntities(delta: number): void {
        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];

            // entity.u
        }
    }
}
