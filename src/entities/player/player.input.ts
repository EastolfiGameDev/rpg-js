import { PerspectiveCamera } from "three";
import { Component } from "../component";

enum Keys {
    W = 87, A = 65, S = 83, D = 68,
    SPACE = 32, SHIFT = 16
}

export class PlayerControllerInput extends Component {
    private camera: PerspectiveCamera;
    private keys = {
        up: false,
        down: false,
        left: false,
        right: false,
        space: false,
        shift: false
    };

    constructor(params: { camera: PerspectiveCamera }) {
        super();

        this.camera = params.camera;

        this.init();
    }

    public initComponent(): void {
        throw new Error("Method not implemented.");
    }

    protected update(_timeElapsed: number): void {
        throw new Error("Method not implemented.");
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
        //
    }
    private onMouseUp(e: MouseEvent): void {
        //
    }
}
