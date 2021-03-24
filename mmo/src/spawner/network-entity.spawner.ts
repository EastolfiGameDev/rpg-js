import { Component } from '../../../core/entities/component';

export class NetworkEntitySpawner extends Component {
    public initComponent(): void {
        throw new Error('Method not implemented.');
    }
    public initEntity(): void {
        // do nothing
    }
    public destroy(): void {
        // do nothing
    }

    public update(_timeElapsed: number): void {
        throw new Error('Method not implemented.');
    }
}
