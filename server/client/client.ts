export interface Client {
    id: string;
    onMessage: (topic: string, data: string) => boolean;
}
