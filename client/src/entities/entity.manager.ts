import { Entity } from './entity';

//common
export class EntityManager {
    private ids = 0;
    private entitiesMap: { [name: string]: Entity } = {};
    private entities: Entity[] = [];

    public add(entity: Entity, name?: string): void {
        if (!name) {
            name = this.generateName();
        }

        this.entitiesMap[name] = entity;
        this.entities.push(entity);

        entity.setParent(this);
        entity.setName(name);
    }

    public get(name: string): Entity {
        return this.entitiesMap[name];
    }

    public update(timeElapsed: number): void {
        for (let entity of this.entities) {
            entity.update(timeElapsed);
        }
    }

    private generateName(): string {
        this.ids += 1;

        return `__name__${this.ids}`;
    }
}
