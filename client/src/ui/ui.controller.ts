import { Component } from '../../../core/entities/component';
import { Entity } from '../../../core/entities/entity';

import { fadeOut as fadeOutLogin } from '../web-components/login.component';

export class UIController extends Component {
    constructor() {
        super();
    }

    public initComponent(): void {
        // icon bar
        // quests
        // chat
    }

    public update(_timeElapsed: number): void {
        // do nothing
    }

    public fadeOutLogin() {
        fadeOutLogin();
    }

    public static createUIEntity(): Entity {
        const ui = new Entity();

        ui.addComponent(new UIController());

        return ui;
    }
}
