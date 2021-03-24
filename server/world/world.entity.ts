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
    character: {
        // definition: string,
        class: string
    };
}



export class WorldEntity {
    private _id: number;

    constructor(params: WorldEntityParams) {
        this._id = params.id;
    }

    public createPlayerBundle(): PlayerBundle {
        return {
            id: this._id,
            description: 'Test',
            transform: null
        };
    }
}
