import { Component } from 'core/entities/component';
import { Entity } from 'core/entities/entity';
import { EntityManager } from 'core/entities/entity.manager';
import { Broadcast } from 'core/events/broadcast';
import { NetworkController } from '../network/network.controller';

import { fadeOut as fadeOutLogin } from '../web-components/account/login.component';

export class UIController extends Component {
    // private chatMessageList;

    constructor() {
        super();
    }

    public initComponent(): void {
        // icon bar
        // quests
        Broadcast.on('send-message.commit', (message: string) => this.sendChatMessage(message));
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

    public fadeOutLogin() {
        fadeOutLogin();
    }

    private sendChatMessage(message: string): void {
        const network = EntityManager.instance.get('network').getComponent('NetworkController') as NetworkController;
        // sanitize message
        network.sendChatMessage(message);
    }

    public static createUIEntity(): Entity {
        const ui = new Entity();

        ui.addComponent(new UIController());

        return ui;
    }
}
