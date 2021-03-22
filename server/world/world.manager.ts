import { SocketEvent } from 'core/events/socket.event';

import { Client } from '../client/client';
import { WorldNetworkClient } from './world-network.client';

export class WorldManager {
    public add(client: Client, params: SocketEvent): void {
        //

        const worldClient = new WorldNetworkClient(client);
    }

    public update(delta: number): void {
        //
    }
}
