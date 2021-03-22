declare type EventCallback = (...params: any) => void;

const events: { [event: string]: EventCallback[] } = {};

export class Broadcast {

    public static emit(event: string, ...params: any): void {
        if (events[event]) {
            for (let callback of events[event]) {
                callback(params);
            }
        }
    }

    public static on(event: string, callback: EventCallback): void {
        const callbacks = events[event] || [];

        callbacks.push(callback);

        events[event] = callbacks;
    }
}
