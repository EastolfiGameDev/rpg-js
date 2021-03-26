import { Socket, io } from 'socket.io-client';

import { BroadcastParam } from 'core/events/broadcast';
import { Component } from 'core/entities/component';
import { Entity } from 'core/entities/entity';
import { PlayerBundle } from 'server/world/world.entity';
import { getAccountParams } from 'mmo/src/web-components/account/login.component';
import { addChatMessage } from 'mmo/src/web-components/ui/chat.component';
import { ChatMessage } from 'server/world/world.client';

import { PlayerSpawner } from '../spawner/player.spawner';

export class NetworkController extends Component {
    private readonly SOCKET_URL = 'ws://localhost:3000';
    private playerId: number = null;
    private socket: Socket;

    constructor() {
        super();

        this.initSocket();
    }

    public initComponent(): void {
        // throw new Error('Method not implemented.');
    }
    public initEntity(): void {
        // do nothing
    }
    public destroy(): void {
        // do nothing
    }

    public sendChatMessage(message: string): void {
        this.socket.emit('chat.message', message);
    }

    public update(_timeElapsed: number): void {
        // throw new Error('Method not implemented.');
    }

    private initSocket(): void {
        this.socket = io(this.SOCKET_URL, {
            reconnection: false,
            transports: ['websocket'],
            timeout: 10000
        });

        this.socket.on('connect', () => {
            console.log(this.socket.id);
            // const randomName = this.generateRandomName();
            // Input validation is for losers
            this.socket.emit('login.commit', getAccountParams());
        });

        this.socket.on('disconnect', () => {
            console.log('DISCONNECTED: ' + this.socket.id); // undefined
        });

        this.socket.onAny((topic: string, data: BroadcastParam) => {
            this.onMessage(topic, data);
        });
    }

    private onMessage(topic: string, data: BroadcastParam): void {
        if (topic === 'world.player') {
            const spawner = this.findEntity('spawners').getComponent('PlayerSpawner') as PlayerSpawner;

            const d = data as PlayerBundle;
            const player = spawner.spawn(d.description);

            player.broadcast({
                topic: 'network.update',
                value: {
                    transform: d.transform
                },
            });

            // broadcast network.inventory

            console.log(`entering world: ${d.id}`);
            this.playerId = d.id;
        } else if (topic === 'world.update') {
            console.log('world.update');
        } else if (topic === 'chat.message') {
            const d = data as ChatMessage;
            addChatMessage({
                text: d.content,
                name: d.name
            });
        }
        // world.update
        // world.inventory
    }

    // private generateRandomName(): string {
    //   const names1 = [
    //       'Aspiring', 'Nameless', 'Cautionary', 'Excited',
    //       'Modest', 'Maniacal', 'Caffeinated', 'Sleepy',
    //       'Passionate', 'Medical',
    //   ];
    //   const names2 = [
    //       'Painter', 'Cheese Guy', 'Giraffe', 'Snowman',
    //       'Doberwolf', 'Cocktail', 'Fondler', 'Typist',
    //       'Noodler', 'Arborist', 'Peeper'
    //   ];

    //   const n1 = names1[ Math.floor(Math.random() * names1.length) ];
    //   const n2 = names2[ Math.floor(Math.random() * names2.length) ];

    //   return `${n1} ${n2}`;
    // }

    public static createNetworkEntity(): Entity {
        const network = new Entity();

        network.addComponent(new NetworkController());

        return network;
    }
}
