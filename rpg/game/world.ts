import { AnimationAction, AnimationClip, AnimationMixer, Color, Group, Object3D, Scene, Vector3 } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

import { Entity } from 'core/entities/entity';
import { Component } from 'core/entities/component';
import { EntityManager } from 'core/entities/entity.manager';
import { ThreeJSController } from 'core/game/three-js.controller';
import { MathUtils } from 'core/utils/math.utils';

export class StaticModel extends Component {
    private scene: Scene;
    private resourcePath: string;
    private resourceName: string;
    private scale: number;
    private emissive: Color;
    private specular: Color;
    private receiveShadow: boolean;
    private castShadow: boolean;
    private visible: boolean;
    private resourceTexture: string;

    private target: Group;
    private mixer: AnimationMixer;

    constructor(params: {
        scene: Scene;
        resourcePath: string;
        resourceName: string;
        scale: number;
        emissive: Color;
        specular: Color;
        receiveShadow: boolean;
        castShadow: boolean;
        visible?: boolean;
        resourceTexture?: string;
    }) {
        super();

        this.scene = params.scene;
        this.resourcePath = params.resourcePath;
        this.resourceName = params.resourceName;
        this.scale = params.scale;
        this.emissive = params.emissive;
        this.specular = params.specular;
        this.receiveShadow = params.receiveShadow;
        this.castShadow = params.castShadow;
        this.visible = params.visible;
        this.resourceTexture = params.resourceTexture;

        this.init();
    }

    public initComponent(): void {
        // this.registerHandler
    }
    public initEntity(): void {
        // do nothing
    }
    public destroy(): void {
        // do nothing
    }

    public update(_timeElapsed: number): void {
        // do nothing
    }

    private init(): void {
        this.loadModels();
    }

    private loadModels(): void {
        if (this.resourceName.endsWith('glb') || this.resourceName.endsWith('gltf')) {
            //
        } else if (this.resourceName.endsWith('fbx')) {
            this.loadFBX();
        }
    }

    private loadGLB(): void {
        this.loadModels();
    }

    private loadFBX(): void {
        const loader = new FBXLoader();

        loader.setPath(this.resourcePath);
        loader.load(this.resourceName, (obj: Group) => this.onResourceLoaded(obj));
    }

    private onResourceLoaded(obj: Group): void {
        this.target = obj;

        this.scene.add(this.target);

        this.target.scale.setScalar(this.scale);
        this.target.position.copy(this.parent.position);

        // this.broadcast

        let texture = null;
        if (this.resourceTexture) {
            //
        }

        this.target.traverse((resource: Object3D) => {
            let object = (resource as Group);

            if ((object as any).material) {
                console.log('we\'ve got a material');
            }

            if (this.receiveShadow != null) {
                object.receiveShadow = this.receiveShadow;
            }
            if (this.castShadow != null) {
                object.castShadow = this.castShadow;
            }
            if (this.visible  != null) {
                object.visible = this.visible;
            }
        });

        this.mixer = new AnimationMixer(this.target);

        const onAnimationLoad = (name: string, animation: Group) => {
            const clip: AnimationClip = animation.animations[0];
            const action: AnimationAction = this.mixer.clipAction(clip);

            action.play();
        };

        // const loader = new FBXLoader();
        // loader.setPath(this.resourcePath);
        // loader.load(this.resou)

        this.parent.mesh = this.target;
    }

}

export class WorldManager {
    private readonly FOLIAGE_COUNT = 100;
    private readonly FOLIAGE_NAMES = [
        'CommonTree_Dead', 'CommonTree',
        'BirchTree', 'BirchTree_Dead',
        'Willow', 'Willow_Dead',
        'PineTree'
    ];

    public addFoliage(): void {
        const { scene } = EntityManager.instance.get('threejs').getComponent('ThreeJSController') as ThreeJSController;

        for (let i = 0; i < this.FOLIAGE_COUNT; i++) {
            const name = this.FOLIAGE_NAMES[MathUtils.randInt(0, this.FOLIAGE_NAMES.length - 1)];
            const index = MathUtils.randInt(1, 5);

            const position = new Vector3(
                (Math.random() * 2.0 - 1.0) * 500,
                0,
                (Math.random() * 2.0 - 1.0) * 500
            );

            const entity = new Entity();
            entity.addComponent(new StaticModel({
                scene,
                resourcePath: './resources/nature/FBX/',
                resourceName: name + '_' + index + '.fbx',
                scale: 0.25,
                emissive: new Color(0x000000),
                specular: new Color(0x000000),
                receiveShadow: true,
                castShadow: true,
            }));

            entity.position = position;
            EntityManager.instance.add(entity);
            entity.activate(false);
        }
    }
}
