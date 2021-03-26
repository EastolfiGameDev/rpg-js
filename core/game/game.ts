import { EntityManager } from 'core/entities/entity.manager';
import { ThreeJSController } from 'core/game/three-js.controller';
import { SpatialHashGrid } from 'core/spatial/spatial-grid';
import { SpawnController } from 'mmo/src/spawner/spawn.controller';

export abstract class Game {
    private delta: number = -1;
    private grid: SpatialHashGrid;

    constructor() {
        this.init();
    }

    protected abstract loadSpecificControllers(): void;
    protected abstract stepChild(_delta: number): void;

    protected init(): void {
        // to be override
    }

    protected startGame(): void {
        this.grid = new SpatialHashGrid(
            [[-1000, -1000], [1000, 1000]],
            [100, 100]
        );

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
        entityManager.add(SpawnController.createSpawnerEntity(this.grid), 'spawners');
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
