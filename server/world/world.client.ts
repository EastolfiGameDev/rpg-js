import { Entity } from 'core/entities/entity';
import { BroadcastParam } from 'core/events/broadcast';
import { Client } from '../client/client';
import { TransformBundle, WorldEntity } from './world.entity';

export class WorldClient {
    protected entity: WorldEntity;
    protected client: Client;

    constructor(client: Client, entity: WorldEntity) {
        this.client = client;
        this.entity = entity;

        this.client.onMessage = (topic: string, data: BroadcastParam) => this.onMessage(topic, data);
        this.client.send('world.player', entity.createPlayerBundle());

        entity.parent = this;
    }

    private onMessage(topic: string, data: BroadcastParam): boolean {
        if (topic === 'world.update') {
            this.entity.updateTransform(data as TransformBundle);
        } else if (topic === 'chat.message') {
            this.onChatMessage((data as string[])[0]);

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

        this.entity.findNearby(50, true).forEach((entity: Entity) => {
            if (entity instanceof WorldEntity) {
                entity.parent.client.send('chat.message', message);
            }
        });
    }
}

export interface ChatMessage {
    name: string;
    content: string;
}

interface ChatMessageParam extends BroadcastParam {
    //
}
