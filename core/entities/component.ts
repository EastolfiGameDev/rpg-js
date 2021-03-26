import { BroadcastParam, Message, MessageHandler } from 'core/events/broadcast';

import { Entity } from './entity';

export abstract class Component {
    public name: string;

    protected parent: Entity = null;

        public abstract initEntity(): void;

    public abstract initComponent(): void;

    public abstract destroy(): void;

    public abstract update(_timeElapsed: number): void;

    public setParent(parent: Entity) {
        this.parent = parent;
    }

    public registerHandler<T extends BroadcastParam>(name: string, handler: MessageHandler<T>): void {
        this.parent.registerHandler(name, handler);
    }

    public getComponent(name: string): Component {
        return this.parent.getComponent(name);
    }

    public findEntity(name: string): Entity {
        return this.parent.findEntity(name);
    }

    public broadcast<T extends BroadcastParam>(message: Message<T>): void {
        this.parent.broadcast(message);
    }
}
