import { Client } from '../client/client';

export class WorldClient {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
        this.client.onMessage
    }

    private onMessage(topic: string, data: string): boolean {
        return false;
    }
}
