import { Scene, Group, Vector3, PerspectiveCamera, SkinnedMesh, Bone, Object3D, sRGBEncoding, AnimationMixer, LoadingManager, AnimationClip, AnimationAction } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

import { Component } from '../component';
import { PlayerStateMachine } from './player.state';

export interface PlayerParams {
    camera: PerspectiveCamera;
    scene: Scene;
}

interface Animation {
    clip: AnimationClip;
    action: AnimationAction;
}

export class PlayerControllerProxy {
    private _animations: { [name: string]: Animation };

    constructor(animations: { [name: string]: Animation }) {
        this._animations = animations;
    }

    get animations(): { [name: string]: Animation } {
        return this._animations;
    }
}

export class PlayerController extends Component {
    private readonly RESOURCES_PATH = 'resources/guard/';

    private decceleration = new Vector3(-0.0005, -0.0001, -5.0);
    private acceleration = new Vector3(1, 0.125, 50.0);
    private velocity = new Vector3(0, 0, 0);
    private position = new Vector3();

    private params: PlayerParams;
    private target: Group;
    private animations: { [name: string]: Animation } = {};
    private stateMachine = new PlayerStateMachine(new PlayerControllerProxy(this.animations));

    private bones: { [name: string]: Bone } = {};
    private mixer: AnimationMixer;
    private manager: LoadingManager;

    constructor(params: PlayerParams) {
        super();

        this.params = params;
        this.init();
    }

    public initComponent(): void {
        //
    }

    protected update(timeElapsed: number): void {
        this.updateController(timeElapsed);
    }

    private init(): void {
        this.loadModels();
    }

    private loadModels(): void {
        const loader = new FBXLoader();

        loader.setPath(this.RESOURCES_PATH);
        loader.load('castle_guard_01.fbx', (obj: Group) => {
            this.target = obj;
            this.target.scale.setScalar(0.035);
            this.params.scene.add(this.target);

            const mesh: SkinnedMesh = this.target.children[1] as SkinnedMesh;
            for (let bone of mesh.skeleton.bones) {
                this.bones[bone.name] = bone;
            }

            this.target.traverse((resource: Object3D) => {
                resource.castShadow = true;
                resource.receiveShadow = true;

                // if (resource.material?.map) {
                //     resource.material.map.encoding = sRGBEncoding;
                // }
            });

            // broadcast

            this.mixer = new AnimationMixer(this.target);

            const onAnimationLoad = (name: string, animation: Group) => {
                const clip: AnimationClip = animation.animations[0];
                const action: AnimationAction = this.mixer.clipAction(clip);

                this.animations[name] = { clip, action };
            };

            this.manager = new LoadingManager();
            this.manager.onLoad = () => {
                this.stateMachine.setState('idle');
            };

            const loader = new FBXLoader(this.manager);
            loader.setPath(this.RESOURCES_PATH);
            loader.load('Sword And Shield Idle.fbx', (animation: Group) => onAnimationLoad('idle', animation));
        });
    }

    private updateController(delta: number): void {
        if (!this.stateMachine.currentState) {
            return;
        }

        // input

        this.mixer?.update(delta);

        // HARDCODED

    }

}
