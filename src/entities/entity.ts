import { Vector3, Quaternion } from 'three';

import { Component } from './component';
import { EntityManager } from './entity.manager';

export class Entity {
    public position = new Vector3();
    public rotation = new Quaternion();

    private name: string = null;
    private parent: Entity | EntityManager = null;
    private components: {[name: string]: Component} = {};
    private handlers = {};

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

    public setParent(parent: Entity | EntityManager): void {
        this.parent = parent;
    }

    public registerHandler(): void {
        //
    }

    public update(timeElapsed: number) {
        for (let key in this.components) {
            this.components[key].update(timeElapsed);
        }
    }

    public setPosition(position: Vector3): void {
        this.position.copy(position);
        // this.Broadcast({
        //     topic: 'update.position',
        //     value: this._position,
        // });
    }

    // SetQuaternion
    public setRotation(rotation: Quaternion): void {
        this.rotation.copy(rotation);
        // this.Broadcast({
        //     topic: 'update.rotation',
        //     value: this._rotation,
        // });
      }
}
