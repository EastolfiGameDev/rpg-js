import { EntityManager } from 'core/entities/entity.manager';
import { ThreeJSController } from 'core/game/three-js.controller';

export abstract class Game {
    private delta: number = -1;

    constructor() {
        this.init();
    }

    protected abstract loadSpecificControllers(): void;
    protected abstract stepChild(_delta: number): void;

    protected init(): void {
        // to be override
    }

    protected startGame(): void {
        this.loadControllers();
        this.process();
    }

    private loadControllers(): void {
        this.loadCommonControllers();
        this.loadSpecificControllers();
    }

    private loadCommonControllers(): void {
        const entityManager = EntityManager.instance;

        entityManager.add(ThreeJSController.createThreeJsEntity(), 'threejs');
    }

    private process() {
        requestAnimationFrame((t: number) => {
            if (this.delta === -1) {
                this.delta = t;
            }

            // Process
            // this.processChild();

            const { threejs, scene, camera } = EntityManager.instance.get('threejs').getComponent('ThreeJSController') as ThreeJSController;
            threejs.render(scene, camera);

            this.step(t - this.delta);
            this.delta = t;

            // Process
            setTimeout(() => {
                this.process();
            }, 1);
        });
    }

    private step(delta: number) {
        const timeElapsed = Math.min(1.0 / 30.0, delta * 0.001);

        this.stepChild(delta);

        EntityManager.instance.update(timeElapsed);
    }
}
