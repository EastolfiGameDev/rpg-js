// import {  } from 'three/examples/jsm/libs/dat.gui.module';
import { GUI } from 'dat.gui';


export class GuiManager {
    private gui: GUI = new GUI();
    private guiParams = {
        general: {}
    };

    public createGUI(): void {

        this.gui.addFolder('General');
        this.gui.close();
    }
}
