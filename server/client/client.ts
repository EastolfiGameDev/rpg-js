import { BroadcastParam } from 'core/events/broadcast';

export interface Client {
    id: string;
    isAlive: boolean;

    onMessage: (topic: string, data: BroadcastParam) => boolean;

    send(topic: string, data: BroadcastParam): void;
    disconnect(): void;
}
