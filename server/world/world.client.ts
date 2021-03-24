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
        if (topic === 'chat.message') {
            const params = data as string[];
            this.onChatMessage(params[0]);
            return true;
        }

        return false;
    }

    private onChatMessage(message: string): void {
        this.broadcastChatMessage({
            name: this.entity.accountName,
            content: message
        })
    }

    private broadcastChatMessage(message: ChatMessage): void {
        console.log('broadcasting ' + message.content);
        // find near
        // this.entity.parent.send
        this.client.send('chat.message', message);
    }
}

export interface ChatMessage {
    name: string;
    content: string;
}

interface ChatMessageParam extends BroadcastParam {
    //
}
