import { Client } from '../client/client';
import { Event } from '../login/fsm';
import { WorldNetworkClient } from './world-network.client';

export class WorldManager {
    public add(client: Client, params: Event): void {
        //

        const worldClient = new WorldNetworkClient(client);
    }

    public update(delta: number): void {
        //
    }
}
