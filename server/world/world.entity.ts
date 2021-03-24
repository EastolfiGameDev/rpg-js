import { Quaternion, Vector3 } from 'three';

import { BroadcastParam } from 'core/events/broadcast';

export interface TransformBundle extends BroadcastParam {
    //
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
    account: {
        name: string
    },
    character: {
        // definition: string,
        class: string
    };
}



export class WorldEntity {
    private _id: number;
    private _accountName: string;

    constructor(params: WorldEntityParams) {
        this._id = params.id;
        this._accountName = params.account.name;
    }

    public get accountName(): string {
        return this._accountName;
    }

    public createPlayerBundle(): PlayerBundle {
        return {
            id: this._id,
            description: 'Test',
            transform: null
        };
    }
}
