import { PerspectiveCamera, Vector, Vector3 } from "three";
import { Component } from "../component";
import { Entity } from "../entity";

export class ThirdPersonCamera extends Component {
    private camera: PerspectiveCamera;
    private target: Entity;
    private currentPosition = new Vector3();
    private currentLookAt = new Vector3();

    constructor(params: { camera: PerspectiveCamera, target: Entity }) {
        super();

        this.camera = params.camera;
        this.target = params.target;
    }

    public initComponent(): void {
        // do nothing
    }

    protected update(timeElapsed: number): void {
        const idealOffset = this.calculateIdealOffset();
        const idealLookat = this.calculateIdealLookat();

        // const t = 0.05;
        // const t = 4.0 * timeElapsed;
        const t = 1.0 - Math.pow(0.01, timeElapsed);

        this.currentPosition.lerp(idealOffset, t);
        this.currentLookAt.lerp(idealLookat, t);

        this.camera.position.copy(this.currentPosition);
        this.camera.lookAt(this.currentLookAt);
    }

    private calculateIdealOffset(): Vector3 {
        const idealOffset = new Vector3(-0, 10, -15);

        idealOffset.applyQuaternion(this.target.rotation);
        idealOffset.add(this.target.position);

        return idealOffset;
    }

    private calculateIdealLookat(): Vector3 {
        const idealLookat = new Vector3(0, 5, 20);

        idealLookat.applyQuaternion(this.target.rotation);
        idealLookat.add(this.target.position);

        return idealLookat;
    }
}
