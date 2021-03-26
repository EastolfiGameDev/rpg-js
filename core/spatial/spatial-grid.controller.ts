import { Vector3 } from 'three';

import { Component } from '../entities/component';
import { Message } from '../events/broadcast';
import { GridClient, SpatialHashGrid } from './spatial-grid';

export class SpatialGridController extends Component {
    private grid: SpatialHashGrid;
    private client: GridClient;

    constructor(grid: SpatialHashGrid) {
        super();

        this.grid = grid;
    }

    public initComponent(): void {
        const pos = [
            this.parent.position.x,
            this.parent.position.z,
        ];

        this.client = this.grid.newClient(pos, [1, 1]);
        this.client.entity = this.parent;
        this.registerHandler<Vector3>('update.position', (message: Message<Vector3>) => this.onPositionUpdate(message));
    }

    public destroy(): void {
        this.grid.removeClient(this.client);
        this.client = null;
    }

    public findNearbyEntities(range: number): GridClient[] {
        return this.grid.findNearby(
            [this.parent.position.x, this.parent.position.z],
            [range, range]
        ).filter((client: GridClient) => client.entity != this.parent);
    }

    public initEntity(): void {
        // do nothing
    }

    public update(_timeElapsed: number): void {
        // do nothing
    }

    private onPositionUpdate(message: Message<Vector3>): void {
        this.client.position = [ message.value.x, message.value.y ];
        this.grid.updateClient(this.client);
    }
}
