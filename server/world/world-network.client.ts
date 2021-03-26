import { Client } from '../client/client';
import { WorldClient } from './world.client';

export class WorldNetworkClient extends WorldClient {
    constructor(client: Client) {
        super(client);
    }
}
