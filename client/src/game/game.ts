// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118.1/build/three.module.js';
import { DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { Vector3 } from 'three';
import { Entity } from '../entities/entity';
import { EntityManager } from '../entities/entity.manager';
import { Broadcast } from '../event/broadcast';
import { GuiManager } from '../gui/gui.manager';
import { NetworkController } from '../network/network.controller';


export class MmoGame {
    // private threejs!: WebGLRenderer;
    // private camera!: PerspectiveCamera;
    // private scene!: Scene;
    // private sun!: DirectionalLight;
    private delta: number = -1;
    private guiManager = new GuiManager();
    private entityManager = new EntityManager();

    constructor() {
        this.init();
    }

    init() {
        document.getElementById('login-ui').style.visibility = 'visible';
        Broadcast.on('login.commit', () => this.startGame());
        // this._initThree();

        // window.addEventListener('resize', () => {
        //     this._onWindowResize();
        // }, false);

        // this.initCamera();
        // this.initScene();
        // this.initWorld();

        // this.loadPlayer();
        // this.loadSky();

        // this.process();
    }

    private startGame(): void {
        this.guiManager.createGUI();
        this.loadControllers();
    }

    private loadControllers(): void {
        const threeJs = new Entity();
        this.entityManager.add(threeJs);

        const network = new Entity();
        network.addComponent(new NetworkController());
        this.entityManager.add(network, 'network');
    }

    // _initThree() {
    //     this.threejs = new THREE.WebGLRenderer({
    //         antialias: true,
    //     });

    //     this.threejs.outputEncoding = THREE.sRGBEncoding;
    //     this.threejs.gammaFactor = 2.2;
    //     this.threejs.shadowMap.enabled = true;
    //     this.threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    //     this.threejs.setPixelRatio(window.devicePixelRatio);
    //     this.threejs.setSize(window.innerWidth, window.innerHeight);
    //     this.threejs.domElement.id = 'threejs';

    //     document.getElementById('container').appendChild(this.threejs.domElement)
    // }

    // initCamera() {
    //     const fov = 60;
    //     const aspect = 1920 / 1080;
    //     const near = 1.0;
    //     const far = 10000.0;

    //     this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    //     this.camera.position.set(25, 10, 25);
    // }

    // initScene() {
    //     this.scene = new THREE.Scene();
    //     this.scene.background = new THREE.Color(0xFFFFFF);
    //     this.scene.fog = new THREE.FogExp2(0x89b2eb, 0.002);
    // }

    // initWorld() {
    //     this._addLight();
    //     this._addPlane();
    // }

    // _addLight() {
    //     let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    //     light.position.set(-10, 500, 10);
    //     light.target.position.set(0, 0, 0);
    //     light.castShadow = true;
    //     light.shadow.bias = -0.001;
    //     light.shadow.mapSize.width = 4096;
    //     light.shadow.mapSize.height = 4096;
    //     light.shadow.camera.near = 0.1;
    //     light.shadow.camera.far = 1000.0;
    //     light.shadow.camera.left = 100;
    //     light.shadow.camera.right = -100;
    //     light.shadow.camera.top = 100;
    //     light.shadow.camera.bottom = -100;

    //     this.scene.add(light);

    //     this.sun = light;
    // }

    // _addPlane() {
    //     const plane = new THREE.Mesh(
    //         new THREE.PlaneGeometry(5000, 5000, 10, 10),
    //         new THREE.MeshStandardMaterial({
    //             color: 0x1e601c,
    //           }));
    //     plane.castShadow = false;
    //     plane.receiveShadow = true;
    //     plane.rotation.x = -Math.PI / 2;
    //     this.scene.add(plane);
    // }

    // private loadPlayer(): void {
    //     this.entityManager.add(new PlayerEntity({
    //         camera: this.camera,
    //         scene: this.scene
    //     }), 'player');

    //     const camera = new Entity();
    //     camera.addComponent(new ThirdPersonCamera({
    //         camera: this.camera,
    //         target: this.entityManager.get('player')
    //     }));
    //     this.entityManager.add(camera, 'player-camera');
    // }

    // loadSky() {
    //     const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0xFFFFFFF, 0.6);
    //     hemiLight.color.setHSL(0.6, 1, 0.6);
    //     hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    //     this.scene.add(hemiLight);

    //     const uniforms = {
    //         "topColor": { value: new THREE.Color(0x0077ff) },
    //         "bottomColor": { value: new THREE.Color(0xffffff) },
    //         "offset": { value: 33 },
    //         "exponent": { value: 0.6 }
    //     };
    //     uniforms["topColor"].value.copy(hemiLight.color);

    //     this.scene.fog.color.copy(uniforms["bottomColor"].value);

    //     const skyGeo = new THREE.SphereBufferGeometry(1000, 32, 15);
    //     const skyMat = new THREE.ShaderMaterial({
    //         uniforms: uniforms,
    //         vertexShader: _VS,
    //         fragmentShader: _FS,
    //         side: THREE.BackSide
    //     });

    //     const sky = new THREE.Mesh(skyGeo, skyMat);
    //     this.scene.add(sky);
    // }

    // _onWindowResize() {
    //     this.camera.aspect = window.innerWidth / window.innerHeight;
    //     this.camera.updateProjectionMatrix();
    //     this.threejs.setSize(window.innerWidth, window.innerHeight);
    // }

    // private updateSun(): void {
    //     const player = this.entityManager.get('player');
    //     const position = player.position;

    //     this.sun.position.copy(position);
    //     this.sun.position.add(new Vector3(-10, 500, -10));
    //     this.sun.target.position.copy(position);
    //     this.sun.updateMatrixWorld();
    //     this.sun.target.updateMatrixWorld();
    // }

    private process() {
        requestAnimationFrame((t: number) => {
            if (this.delta === -1) {
                this.delta = t;
            }

            // this.process();

            // this.threejs.render(this.scene, this.camera);
            this.step(t - this.delta);
            this.delta = t;

            setTimeout(() => {
                this.process();
            }, 1);
        });
    }

    private step(delta: number) {
        const timeElapsed = Math.min(1.0 / 30.0, delta * 0.001);

        // this.updateSun();

        // this.entityManager.update(timeElapsed);
    }
}
