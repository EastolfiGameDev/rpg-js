import { Entity } from './entity';

export abstract class Component {
    public name: string;

    protected parent: Entity = null;

    public abstract initComponent(): void;

    public abstract update(_timeElapsed: number): void;

    public setParent(parent: Entity) {
        this.parent = parent;
    }

    public registerHandler(): void {
        this.parent.registerHandler();
    }

    public getComponent(name: string): Component {
        return this.parent.getComponent(name);
    }

    public findEntity(name: string): Entity {
        return this.parent.findEntity(name);
    }
}
