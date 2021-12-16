export class Wallet {
    public id?: number;
    public funds?: string;
    public userId?: number;

    constructor(props: Wallet) {
        Object.assign(this, props);
    }
}