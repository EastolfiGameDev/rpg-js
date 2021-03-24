declare type EventCallback = (...params: any) => void;

const events: { [event: string]: EventCallback[] } = {};

export interface Message<T extends BroadcastParam> {
    topic: string;
    value: T;
}

export interface BroadcastParam {
    [param: string]: any;
}

export declare type MessageHandler<T extends BroadcastParam> = (message: Message<T>) => void;

export class Broadcast {

    public static emit(event: string, ...params: any): void {
        if (events[event]) {
            for (let callback of events[event]) {
                callback(params);
            }
        }
    }

    public static on(event: string, callback: EventCallback): void {
        if (!events[event]) {
            events[event] = [];
        }

        events[event].push(callback);
    }
}
