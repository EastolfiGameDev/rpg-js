export interface SocketEvent {
    topic: string;
    params?: { [key: string]: string };
    // params?: string;
}

// interface Event {
//     topic: string;
//     params: string;
// }
