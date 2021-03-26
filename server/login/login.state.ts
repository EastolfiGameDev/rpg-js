import { Event, FiniteStateMachine } from './fsm';

export abstract class State {
    public parent: FiniteStateMachine;

    public broadcast(event: Event): void {
        this.parent.broadcast(event);
    }

    public abstract enter(previous: State): void;
    public abstract exit(): void;
    public abstract onMessage(event: string, data: string): boolean;
}

export class LoginAwait extends State {
    constructor() {
        super();
    }

    public enter(_previous: State): void {
        // do nothing
    }

    public exit(): void {
        // do nothing
    }

    public onMessage(event: string, data: string): boolean {
        if (event !== 'login.commit') {
            return false;
        }

        this.parent.setState(new LoginConfirm({ accountName: data }))
    }
}

export class LoginConfirm extends State {
    private accountName: string;

    constructor(params: { accountName: string }) {
        super();

        this.accountName = params.accountName;
    }

    public enter(_previous: State): void {
        console.log('login confirmed: ' + this.accountName);
        this.broadcast({topic: 'login.complete'/*, params: this.params_*/ });
    }

    public exit(): void {
        // do nothing
    }

    public onMessage(_event: string, _data: string): boolean {
        return true;
    }
}
