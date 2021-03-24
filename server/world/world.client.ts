import { BroadcastParam } from 'core/events/broadcast';
import { Client } from '../client/client';
import { WorldEntity } from './world.entity';

export class WorldClient {
    private entity: WorldEntity;

    private client: Client;

    constructor(client: Client, entity: WorldEntity) {
        this.client = client;
        this.entity = entity;

        this.client.onMessage = (topic: string, data: BroadcastParam) => this.onMessage(topic, data);
        this.client.send('world.player', entity.createPlayerBundle())
    }

    private onMessage(topic: string, data: BroadcastParam): boolean {
        return false;
    }
}
