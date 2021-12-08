export class Product {
    public id: number;
    public name: string;
    public price: number,
    public amount: number,
    public rate: number,
    public description: string,
    public weight: number,
    public height: number,
    public width: number,
    public deeph: number
}

    constructor(props: Product) {
        Object.assign(this, props);
    }
}
