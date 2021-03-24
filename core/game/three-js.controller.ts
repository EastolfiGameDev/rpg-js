import {
    BackSide,
    Color,
    DirectionalLight,
    FogExp2,
    HemisphereLight,
    Mesh,
    MeshStandardMaterial,
    PCFSoftShadowMap,
    PerspectiveCamera,
    PlaneGeometry,
    Scene,
    ShaderMaterial,
    SphereBufferGeometry,
    sRGBEncoding,
    Vector3,
    WebGLRenderer
} from 'three';

import { Entity } from 'core/entities/entity';
import { Component } from 'core/entities/component';
import { EntityManager } from 'core/entities/entity.manager';

const _VS = `
varying vec3 vWorldPosition;
void main() {
  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
  vWorldPosition = worldPosition.xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`;


const _FS = `
uniform vec3 topColor;
uniform vec3 bottomColor;
uniform float offset;
uniform float exponent;
varying vec3 vWorldPosition;
void main() {
  float h = normalize( vWorldPosition + offset ).y;
  gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );
}`;

export class ThreeJSController extends Component {
    private _threejs: WebGLRenderer;
    private _camera: PerspectiveCamera;
    private _scene: Scene;
    private sun: DirectionalLight;

    constructor() {
        super();
    }

    public get threejs(): WebGLRenderer {
        return this._threejs;
    }

    public get scene(): Scene {
        return this._scene;
    }

    public get camera(): PerspectiveCamera {
        return this._camera;
    }

    public initComponent(): void {
        this.initThreeJS();

        window.addEventListener('resize', () => {
            this.onWindowResize();
        }, false);

        this.initCamera();
        this.initScene();
        this.initWorld();
    }
    public initEntity(): void {
        // do nothing
    }
    public destroy(): void {
        // do nothing
    }

    public update(_timeElapsed: number): void {
        this.updateSun();
    }

    private initThreeJS(): void {
        this._threejs = new WebGLRenderer({
            antialias: false
        });

        this._threejs.outputEncoding = sRGBEncoding;
        this._threejs.gammaFactor = 2.2;
        this._threejs.shadowMap.enabled = true;
        this._threejs.shadowMap.type = PCFSoftShadowMap;
        this._threejs.setPixelRatio(window.devicePixelRatio);
        this._threejs.setSize(window.innerWidth, window.innerHeight);
        this._threejs.domElement.id = 'threejs';

        document.getElementById('container').appendChild(this._threejs.domElement);
    }

    private initCamera() {
        const fov = 60;
        const aspect = 1920 / 1080;
        const near = 1.0;
        const far = 10000.0;

        this._camera = new PerspectiveCamera(fov, aspect, near, far);
        this._camera.position.set(25, 10, 25);
    }

    private initScene(): void {
        this._scene = new Scene();
        this._scene.background = new Color(0xFFFFFF);
        this._scene.fog = new FogExp2(0x89b2eb, 0.002);
    }

    private initWorld() {
        this.addLight();
        this.addPlane();
        this.loadSky();
    }

    private addLight(): void {
        let light = new DirectionalLight(0xFFFFFF, 1.0);

        light.position.set(-10, 500, 10);
        light.target.position.set(0, 0, 0);
        light.castShadow = true;
        light.shadow.bias = -0.001;
        light.shadow.mapSize.width = 4096;
        light.shadow.mapSize.height = 4096;
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 1000.0;
        light.shadow.camera.left = 100;
        light.shadow.camera.right = -100;
        light.shadow.camera.top = 100;
        light.shadow.camera.bottom = -100;

        this._scene.add(light);

        this.sun = light;
    }

    private addPlane(): void {
        const plane = new Mesh(
            new PlaneGeometry(5000, 5000, 10, 10),
            new MeshStandardMaterial({
                color: 0x1e601c,
            })
        );

        plane.castShadow = false;
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2;

        this._scene.add(plane);
    }

    private loadSky() {
        const hemiLight = new HemisphereLight(0xFFFFFF, 0xFFFFFFF, 0.6);
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        this._scene.add(hemiLight);

        const uniforms = {
            'topColor': { value: new Color(0x0077ff) },
            'bottomColor': { value: new Color(0xffffff) },
            'offset': { value: 33 },
            'exponent': { value: 0.6 }
        };
        uniforms['topColor'].value.copy(hemiLight.color);

        this._scene.fog.color.copy(uniforms['bottomColor'].value);

        const skyGeo = new SphereBufferGeometry(1000, 32, 15);
        const skyMat = new ShaderMaterial({
            uniforms: uniforms,
            vertexShader: _VS,
            fragmentShader: _FS,
            side: BackSide
        });

        const sky = new Mesh(skyGeo, skyMat);
        this._scene.add(sky);
    }

    private updateSun(): void {
        // const player = EntityManager.instance.get('player');
        // const position = player.position;

        // this.sun.position.copy(position);
        // this.sun.position.add(new Vector3(-10, 500, -10));
        // this.sun.target.position.copy(position);
        // this.sun.updateMatrixWorld();
        // this.sun.target.updateMatrixWorld();
    }

    private onWindowResize(): void {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._threejs.setSize(window.innerWidth, window.innerHeight);
    }

    public static createThreeJsEntity(): Entity {
        const threejs = new Entity();

        threejs.addComponent(new ThreeJSController());

        return threejs;
    }
}
