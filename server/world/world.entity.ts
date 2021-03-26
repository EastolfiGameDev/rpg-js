import { Quaternion, Vector3 } from 'three';

import { BroadcastParam } from 'core/events/broadcast';
import { SpatialHashGrid, GridClient } from 'core/spatial/spatial-grid';
import { WorldClient } from './world.client';
import { Entity } from 'core/entities/entity';

export interface TransformBundle extends BroadcastParam {
    state: string;
    position: Vector3,
    rotation: Quaternion
}

export interface PlayerBundle extends BroadcastParam {
    id: number;
    description: string;
    transform: TransformBundle
}

interface WorldEntityParams {
    id: number;
    position: Vector3;
    rotation: Quaternion;
    grid: SpatialHashGrid,
    account: {
        name: string
    },
    character: {
        // definition: string,
        class: string
    };
}



export class WorldEntity extends Entity/* implements GridEntity*/ {
    public parent: WorldClient;
    // private _id: number;
    private _accountName: string;

    // private position: Vector3;
    // private rotation: Quaternion;
    private grid: SpatialHashGrid;
    private gridClient: GridClient;
    private state = 'idle';

    constructor(params: WorldEntityParams) {
        super();

        // this._id = params.id;
        this._accountName = params.account.name;

        this.position = new Vector3().copy(params.position);
        this.rotation = new Quaternion().copy(params.rotation);

        this.grid = params.grid;
        // should be y or z ?
        this.gridClient = this.grid.newClient([this.position.x, this.position.z], [10, 10]);
        this.gridClient.entity = this;
    }

    // public get id(): number {
    //     return this._id;
    // }

    public get accountName(): string {
        return this._accountName;
    }

    public findNearby(radius: number, includeSelf: boolean = false): Entity[] {
        // check
        const nearby: Entity[] = this.grid.findNearby(
            [this.position.x, this.position.z],
            [radius, radius]
        ).map(client => client.entity);

        if (!includeSelf) {
            return nearby.filter((entity: Entity) => entity.id != this.id);
        }

        return nearby;
    }

    public updateTransform(data: TransformBundle): void {
        //stats - death
        this.state = data.state;
        this.position = new Vector3(data.position.x, data.position.y, data.position.z);
        this.rotation = new Quaternion(data.rotation.x, data.rotation.y, data.rotation.z, data.rotation.w);

        this.updateGridClient();
    }

    private updateGridClient(): void {
        this.gridClient.position = [this.position.x, this.position.z];
        this.grid.updateClient(this.gridClient);
    }

    public createPlayerBundle(): PlayerBundle {
        return {
            id: this.id,
            description: 'Test',
            transform: this.createTransformBundle()
        };
    }

    public createTransformBundle(): TransformBundle {
        return {
            state: this.state,
            position: this.position,
            rotation: this.rotation
        }
    }
}
