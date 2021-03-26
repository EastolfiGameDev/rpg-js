import { Entity } from 'core/entities/entity';

import { Client } from '../client/client';
import { WorldClient } from './world.client';
import { WorldEntity, TransformBundle } from './world.entity';

interface EntityCache {
    [id: number]: { id: number, transform: TransformBundle }
}

export class WorldNetworkClient extends WorldClient {
    private cache: EntityCache = {};

    constructor(client: Client, entity: WorldEntity) {
        super(client, entity);
    }

    public updateClientState(): void {
        const nearbyEntities = this.entity.findNearby(500).filter((entity: Entity) => entity.id !== this.entity.id) as WorldEntity[];

        const updates = [{
            id: this.entity.id,
            // stats: this.entity.CreateStatsPacket_(),
            // events: this.entity.CreateEventsPacket_(),
        }];
        const newCache: EntityCache = {};

        for (let nearby of nearbyEntities) {
            // We could easily trim this down based on what we know
            // this client saw last. Maybe do it later.
            const cur = {
                id: nearby.id,
                transform: nearby.createTransformBundle(),
                // stats: nearby.CreateStatsPacket_(),
                // events: nearby.CreateEventsPacket_(),
            };

            // if (!(nearby.id in this.entityCache_)) {
            //   cur.desc = nearby.GetDescription();
            // }

            newCache[nearby.id] = cur;
            updates.push(cur);
        }

        this.cache = newCache;

        this.client.send('world.update', updates);
    }
}
