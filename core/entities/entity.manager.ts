import { Entity } from './entity';

let instance: EntityManager = null;

export class EntityManager {
    private ids = 0;
    private entitiesMap: { [name: string]: Entity } = {};
    private entities: Entity[] = [];

    public static get instance(): EntityManager {
        if (instance === null) {
            instance = new EntityManager();
        }

        return instance;
    }

    public add(entity: Entity, name?: string): void {
        if (!name) {
            name = this.generateName();
        }

        this.entitiesMap[name] = entity;
        this.entities.push(entity);

        // entity.setParent(this);
        entity.setName(name);
        entity.initEntity();
    }

    public get(name: string): Entity {
        return this.entitiesMap[name];
    }

    public update(timeElapsed: number): void {
        for (let entity of this.entities) {
            entity.update(timeElapsed);
        }
    }

    public activate(entity: Entity, b: boolean): void {
        const i = this.entities.indexOf(entity);

        if (i !== -1) {
            this.entities.splice(i, 1);
        }
    }

    private generateName(): string {
        this.ids += 1;

        return `__name__${this.ids}`;
    }
}
