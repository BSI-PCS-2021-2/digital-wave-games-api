export class Cart {
    public id?: number;
    public clientId?: number;

    constructor(props: Cart) {
        Object.assign(this, props);
    }
}