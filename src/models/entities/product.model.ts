export class Product {
    public id: number;
    public name: string;

    constructor(props: Product) {
        Object.assign(this, props);
    }
}
