import { performance } from 'perf_hooks';
import { Server, Socket } from 'socket.io';
import { Client } from '../client/client';
import { SocketWrapper } from '../client/socket.wrapper';
import { LoginQueue } from '../login/login.queue';
import { WorldManager } from './world.manager';
import { LogMethod } from '../logger';
import { Event } from '../login/fsm';

export class WorldServer {
    private worldManager: WorldManager;
    private loginQueue: LoginQueue;

    constructor(io: Server) {
        this.loginQueue = new LoginQueue((client: Client, params: Event) => this.onLogin(client, params));
        this.worldManager = new WorldManager();

        this.initSocket(io);
    }

    @LogMethod()
    public run(): void {
        const t1 = performance.now();
        this.schedule(t1);
    }

    @LogMethod()
    private initSocket(io: Server): void {
        io.on('connection', (socket: Socket) => {
            this.loginQueue.add(new SocketWrapper({ socket }));
        });
    }

    @LogMethod()
    private schedule(t1: number): void {
        setTimeout(() => {
            const t2 = performance.now();
            this.update((t2 - t1) * 0.001);
            this.schedule(t2);
        });
    }

    @LogMethod()
    private onLogin(client: Client, params: Event): void {
        this.worldManager.add(client, params);
    }

    @LogMethod()
    private update(delta: number): void {
        this.worldManager.update(delta);
    }
}
