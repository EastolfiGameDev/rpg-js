// import { PCFSoftShadowMap, sRGBEncoding, WebGLRenderer } from 'three';

// import { Component } from "../entities/component";

// export class ThreeJSController extends Component {
//     private threejs: WebGLRenderer;

//     constructor() {
//         super();
//     }

//     public initComponent(): void {
//         // common
//         this.threejs = new WebGLRenderer({
//             antialias: false
//         });

//         this.threejs.outputEncoding = sRGBEncoding;
//         this.threejs.gammaFactor = 2.2;
//         this.threejs.shadowMap.enabled = true;
//         this.threejs.shadowMap.type = PCFSoftShadowMap;
//         this.threejs.setPixelRatio(window.devicePixelRatio);
//         this.threejs.setSize(window.innerWidth, window.innerHeight);
//         this.threejs.domElement.id = 'threejs';

//         document.getElementById('container').appendChild(this.threejs.domElement)
//     }

//     protected update(_timeElapsed: number): void {
//         // throw new Error("Method not implemented.");
//     }
// }
