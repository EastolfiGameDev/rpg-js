import { Socket } from 'socket.io';
import { Client } from './client';

// common
interface Event {
    topic: string;
    params: string;
}

export class SocketWrapper implements Client {
    public onMessage: (topic: string, data: string) => boolean = null;

    private socket: Socket;

    constructor(params: { socket: Socket }) {
        this.socket = params.socket;

        this.initSocket();
    }

    get id(): string {
        return this.socket.id;
    }

    private initSocket(): void {
        this.socket.on('user-connected', () => {
            console.log('socket.id: ' + this.socket.id);
        });

        this.socket.on('disconnect', () => {
            //
        });

        this.socket.onAny((topic: string, data: string) => {
            if (this.onMessage) {
                if (!this.onMessage(topic, data)) {
                    console.log('Unknown command (' + topic + '), disconnected.');
                    // this.Disconnect();
                }
            } else {
                // this.dis
            }
        });
    }
}
