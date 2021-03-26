import {
    Scene,
    Group,
    Vector3,
    PerspectiveCamera,
    SkinnedMesh,
    Bone,
    Object3D,
    AnimationMixer,
    LoadingManager,
    AnimationClip,
    AnimationAction,
    Quaternion
} from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

import { Component } from 'core/entities/component';
import { EntityManager } from 'core/entities/entity.manager';
import { ThreeJSController } from 'core/game/three-js.controller';
import { Message } from 'core/events/broadcast';

import { PlayerControllerInput } from './player.input';
import { PlayerStateMachine } from './player.fsm';

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
    private group = new Group();

    private target: Group;
    private camera: PerspectiveCamera;
    private scene: Scene;
    private animations: { [name: string]: Animation } = {};
    private stateMachine = new PlayerStateMachine(new PlayerControllerProxy(this.animations));

    private bones: { [name: string]: Bone } = {};
    private mixer: AnimationMixer;
    private manager: LoadingManager;

    constructor() {
        super();

        const { scene, camera } = EntityManager.instance.get('threejs').getComponent('ThreeJSController') as ThreeJSController;
        this.camera = camera;
        this.scene = scene;
    }

    public initEntity(): void {
        this.init();
    }

    public initComponent(): void {
        // this.registerHandler('health.death')
        this.registerHandler('update.position', (message: Message<Vector3>) => this.onPositionUpdate(message));
        this.registerHandler('update.rotation', (message: Message<Quaternion>) => this.onRotationUpdate(message));
    }

    public destroy(): void {
        // do nothing
    }

    public update(timeElapsed: number): void {
        if (!this.stateMachine.currentState) {
            return;
        }

        const input = this.getComponent(PlayerControllerInput.name) as PlayerControllerInput;
        this.stateMachine.update(timeElapsed, input);

        this.mixer?.update(timeElapsed);

        this.broadcast({
            topic: 'player.action',
            value: {
                action: this.stateMachine.currentState.name
            }
        })

        const currentState = this.stateMachine.currentState;
        if (currentState.name != 'walk' &&
            currentState.name != 'run' &&
            currentState.name != 'idle') {
            return;
        }

        const velocity = this.velocity;
        const frameDecceleration = new Vector3(
            velocity.x * this.decceleration.x,
            velocity.y * this.decceleration.y,
            velocity.z * this.decceleration.z
        );
        frameDecceleration.multiplyScalar(timeElapsed);
        frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
            Math.abs(frameDecceleration.z), Math.abs(velocity.z));

        velocity.add(frameDecceleration);

        const controlObject = this.target;
        const _Q = new Quaternion();
        const _A = new Vector3();
        const _R = controlObject.quaternion.clone();

        const acc = this.acceleration.clone();
        if (input.keys.shift) {
            acc.multiplyScalar(2.0);
        }

        if (input.keys.up) {
            velocity.z += acc.z * timeElapsed;
        }
        if (input.keys.down) {
            velocity.z -= acc.z * timeElapsed;
        }
        if (input.keys.left) {
            _A.set(0, 1, 0);
            _Q.setFromAxisAngle(_A, 4.0 * Math.PI * timeElapsed * this.acceleration.y);
            _R.multiply(_Q);
        }
        if (input.keys.right) {
            _A.set(0, 1, 0);
            _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * timeElapsed * this.acceleration.y);
            _R.multiply(_Q);
        }

        controlObject.quaternion.copy(_R);

        const oldPosition = new Vector3();
        oldPosition.copy(controlObject.position);

        const forward = new Vector3(0, 0, 1);
        forward.applyQuaternion(controlObject.quaternion);
        forward.normalize();

        const sideways = new Vector3(1, 0, 0);
        sideways.applyQuaternion(controlObject.quaternion);
        sideways.normalize();

        sideways.multiplyScalar(velocity.x * timeElapsed);
        forward.multiplyScalar(velocity.z * timeElapsed);

        const pos = controlObject.position.clone();
        pos.add(forward);
        pos.add(sideways);

        // const collisions = this._FindIntersections(pos);
        // if (collisions.length > 0) {
        //     return;
        // }

        // const terrain = this.FindEntity('terrain').GetComponent('TerrainChunkManager');
        // pos.y = terrain.GetHeight(pos)[0];

        controlObject.position.copy(pos);
        this.position.copy(pos);

        this.parent.position = this.position;
        this.parent.rotation = this.target.quaternion;
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
            this.scene.add(this.target);

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

            // Make general
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
            loader.load('Sword And Shield Walk.fbx', (animation: Group) => onAnimationLoad('walk', animation));
            loader.load('Sword And Shield Run.fbx', (animation: Group) => onAnimationLoad('run', animation));
            loader.load('Sword And Shield Slash.fbx', (animation: Group) => onAnimationLoad('attack', animation));
            loader.load('Sword And Shield Death.fbx', (animation: Group) => onAnimationLoad('death', animation));
        });
    }

    private onPositionUpdate(message: Message<Vector3>): void {
        this.group.position.copy(message.value);
    }

    private onRotationUpdate(message: Message<Quaternion>): void {
        this.group.quaternion.copy(message.value);
    }

    private onDeath(): void {
        this.stateMachine.setState('death');
    }
}
