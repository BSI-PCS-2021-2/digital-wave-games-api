export class Order {
    public id: number;
    public totalPrice: number;
    public totalWeight: number;
    public expectedDeliveryDate: Date;
    public purchaseDate: Date;
    public paymentType: string;
    public userClientId: number;



    constructor(props: Order) {
        Object.assign(this, props);
    }
}
