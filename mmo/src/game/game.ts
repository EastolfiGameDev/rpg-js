import { EntityManager } from 'core/entities/entity.manager';
import { ThreeJSController } from 'core/game/three-js.controller';
import { Game } from 'core/game/game';

import { Broadcast } from '../event/broadcast';
import { GuiManager } from '../gui/gui.manager';
import { NetworkController } from '../network/network.controller';
import { SpawnController } from '../spawner/spawn.controller';
import { UIController } from '../ui/ui.controller';


export class MmoGame extends Game {
    private guiManager = new GuiManager();

    constructor() {
        super();
    }

    protected init(): void {
        super.init();

        document.getElementById('login-ui').style.visibility = 'visible';
        Broadcast.on('login.commit', () => {
            this.guiManager.createGUI();
            this.startGame()
        });
    }

    protected stepChild(_delta: number): void {
        // do nothing
    }

    protected loadSpecificControllers(): void {
        const entityManager = EntityManager.instance;

        entityManager.add(UIController.createUIEntity(), 'ui');
        entityManager.add(NetworkController.createNetworkEntity(), 'network');

        const { scene, camera } = entityManager.get('threejs').getComponent('ThreeJSController') as ThreeJSController;
        entityManager.add(SpawnController.createSpawnerEntity({
            // grid: this.grid_,
            scene, camera
        }), 'spawners');
    }
}
