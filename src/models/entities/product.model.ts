export class Product {
    public name: string;
    public price: number;
    public rate: number;
    public description: string;

    constructor(props: Product) {
        Object.assign(this, props);
    }
}
