import { PerspectiveCamera } from "three";

import { Component } from 'core/entities/component';

enum Keys {
    W = 87, A = 65, S = 83, D = 68,
    SPACE = 32, SHIFT = 16
}

export class PlayerControllerInput extends Component {
    public keys = {
        up: false,
        down: false,
        left: false,
        right: false,
        space: false,
        shift: false
    };

    private camera: PerspectiveCamera;

    constructor(params: { camera: PerspectiveCamera }) {
        super();

        this.camera = params.camera;

        this.init();
    }

    public initComponent(): void {
        // do nothing
    }

    public update(_timeElapsed: number): void {
        // do nothing
    }

    private init(): void {
        document.addEventListener('keydown', (e: KeyboardEvent) => this.onKeyDown(e), false)
        document.addEventListener('keyup', (e: KeyboardEvent) => this.onKeyUp(e), false)
        document.addEventListener('mouseup', (e: MouseEvent) => this.onMouseUp(e), false)
    }

    private onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case Keys.W:
                this.keys.up = true;
                break;
            case Keys.A:
                this.keys.left = true;
                break;
            case Keys.S:
                this.keys.down = true;
                break;
            case Keys.D:
                this.keys.right = true;
                break;
            case Keys.SPACE:
                this.keys.space = true;
                break;
            case Keys.SHIFT:
                this.keys.shift = true;
                break;
        }
    }
    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case Keys.W:
                this.keys.up = false;
                break;
            case Keys.A:
                this.keys.left = false;
                break;
            case Keys.S:
                this.keys.down = false;
                break;
            case Keys.D:
                this.keys.right = false;
                break;
            case Keys.SPACE:
                this.keys.space = false;
                break;
            case Keys.SHIFT:
                this.keys.shift = false;
                break;
        }
    }
    private onMouseUp(e: MouseEvent): void {
        // const rect = document.getElementById('threejs').getBoundingClientRect();
        // const pos = {
        //     x: ((e.clientX - rect.left) / rect.width) * 2  - 1,
        //     y: ((e.clientY - rect.top ) / rect.height) * -2 + 1,
        // };

        // this._raycaster.setFromCamera(pos, this._params.camera);

        // const pickables = this._parent._parent.Filter((e) => {
        //     const p = e.GetComponent('PickableComponent');
        //     if (!p) {
        //     return false;
        //     }
        //     return e._mesh;
        // });

        // const ray = new Ray();
        // ray.origin.setFromMatrixPosition(this._params.camera.matrixWorld);
        // ray.direction.set(pos.x, pos.y, 0.5).unproject(
        //     this._params.camera).sub(ray.origin).normalize();

        // // hack
        // document.getElementById('quest-ui').style.visibility = 'hidden';

        // for (let p of pickables) {
        //     // GOOD ENOUGH
        //     const box = new THREE.Box3().setFromObject(p._mesh);

        //     if (ray.intersectsBox(box)) {
        //     p.Broadcast({
        //         topic: 'input.picked'
        //     });
        //     break;
        //     }
        // }
    }
}
