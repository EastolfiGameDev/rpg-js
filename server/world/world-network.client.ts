import { Entity } from 'core/entities/entity';

import { Client } from '../client/client';
import { WorldClient } from './world.client';
import { WorldEntity } from './world.entity';

export class WorldNetworkClient extends WorldClient {
    constructor(client: Client, entity: WorldEntity) {
        super(client, entity);
    }
}
