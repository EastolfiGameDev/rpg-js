import { Socket, io } from 'socket.io-client';

import { Component } from '../entities/component';
import { getAccountName } from '../web-components/login.component';

export class NetworkController extends Component {
    private readonly SOCKET_URL = 'ws://localhost:3000';
    private playerId = null;
    private socket: Socket;

    constructor() {
        super();

        this.initSocket();
    }

    public initComponent(): void {
        // throw new Error('Method not implemented.');
    }

    protected update(_timeElapsed: number): void {
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
            this.socket.emit('login.commit', getAccountName());
        });

        this.socket.on('disconnect', () => {
            console.log('DISCONNECTED: ' + this.socket.id); // undefined
        });

        this.socket.onAny((event, data) => {
            debugger;
        });
    }

    private generateRandomName(): string {
      const names1 = [
          'Aspiring', 'Nameless', 'Cautionary', 'Excited',
          'Modest', 'Maniacal', 'Caffeinated', 'Sleepy',
          'Passionate', 'Medical',
      ];
      const names2 = [
          'Painter', 'Cheese Guy', 'Giraffe', 'Snowman',
          'Doberwolf', 'Cocktail', 'Fondler', 'Typist',
          'Noodler', 'Arborist', 'Peeper'
      ];

      const n1 = names1[ Math.floor(Math.random() * names1.length) ];
      const n2 = names2[ Math.floor(Math.random() * names2.length) ];

      return `${n1} ${n2}`;
    }
}
