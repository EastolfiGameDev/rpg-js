import { createServer } from 'http';
import { Server } from 'socket.io';

import { WorldServer } from './world/world.server';

const port = process.env.PORT || 3000;
const server = createServer();
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

server.listen(port, () => {
    console.log('Listening on port: *', port);
});

const world = new WorldServer(io);
world.run();
