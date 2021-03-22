import { PerspectiveCamera, Scene } from 'three';

import { Component } from '../../../core/entities/component';
import { UIController } from '../ui/ui.controller';

export class PlayerSpawner extends Component {
    constructor(params: {
        // grid: this.grid_,
        scene: Scene,
        camera: PerspectiveCamera,
    }) {
        super();
    }

    public initComponent(): void {
        (this.findEntity('ui').getComponent('UIController') as UIController).fadeOutLogin();
    }

    public update(_timeElapsed: number): void {
        // throw new Error('Method not implemented.');
    }
}
