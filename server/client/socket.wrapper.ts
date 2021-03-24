import { BroadcastParam } from 'core/events/broadcast';
import { Socket } from 'socket.io';
import { Client } from './client';

export class SocketWrapper implements Client {
    public onMessage: (topic: string, data: BroadcastParam) => boolean = null;

    private socket: Socket;
    private _alive: boolean = true;

    constructor(params: { socket: Socket }) {
        this.socket = params.socket;

        this.initSocket();
    }

    get id(): string {
        return this.socket.id;
    }

    get isAlive(): boolean {
        return this._alive;
    }

    public send(topic: string, data: BroadcastParam): void {
        this.socket.emit(topic, data);
    }

    public disconnect(): void {
        this.socket.disconnect();
    }

    private initSocket(): void {
        this.socket.on('user-connected', () => {
            console.log('socket.id: ' + this.socket.id);
        });

        this.socket.on('disconnect', () => {
            this._alive = false;
        });

        this.socket.onAny((topic: string, data: BroadcastParam) => {
            if (this.onMessage) {
                if (!this.onMessage(topic, data)) {
                    console.log('Unknown command (' + topic + '), disconnected.');
                    this.disconnect();
                }
            } else {
                this.disconnect();
            }
        });
    }
}
