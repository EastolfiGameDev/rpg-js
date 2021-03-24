import { Vector3, Quaternion, Object3D } from 'three';

import { Message, MessageHandler } from 'core/events/broadcast';

import { Component } from './component';
import { EntityManager } from './entity.manager';

export class Entity {
    public mesh: Object3D;

    private _position = new Vector3();
    private _rotation = new Quaternion();
    private name: string = null;
    private components: {[name: string]: Component} = {};
    private handlers: { [name: string]: MessageHandler<any>[] } = {};

    public get position(): Vector3 {
        return this._position;
    }

    public set position(position: Vector3) {
        this._position.copy(position);
        this.broadcast({
            topic: 'update.position',
            value: this._position,
        });
    }

    public get rotation(): Quaternion {
        return this._rotation;
    }

    public set rotation(rotation: Quaternion) {
        this._rotation.copy(rotation);
        this.broadcast({
            topic: 'update.rotation',
            value: this._rotation,
        });
    }

    public addComponent(component: Component): void {
        component.setParent(this);

        this.components[component.constructor.name] = component;

        component.initComponent();
    }

    public getComponent(name: string): Component {
        return this.components[name];
    }

    public setName(name: string): void {
        this.name = name;
    }

    public broadcast(message: Message<any>): void {
        if (!(message.topic in this.handlers)) {
            return
        }

        for (let handler of this.handlers[message.topic]) {
            handler(message);
        }
    }

    public registerHandler(name: string, handler: MessageHandler<any>): void {
        if (!this.handlers[name]) {
            this.handlers[name] = [];
        }

        this.handlers[name].push(handler);
    }

    public activate(b: boolean): void {
        EntityManager.instance.activate(this, b);
    }

    public findEntity(name: string): Entity {
        return EntityManager.instance.get(name);
    }

    public update(timeElapsed: number) {
        for (let key in this.components) {
            this.components[key].update(timeElapsed);
        }
    }

    public initEntity(): void {
        for (let key in this.components) {
            this.components[key].initEntity();
        }
    }

    public destroy(): void {
        for (let key in this.components) {
            this.components[key].destroy();
        }

        this.components = null;
        this.handlers = null;
    }
}
