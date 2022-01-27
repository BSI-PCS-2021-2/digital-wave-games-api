export class Order {
    public id?: number;
    public totalPrice?: number;
    public expectedDeliveryDate?: Date;
    public purchaseDate?: Date;
    public paymentType?: number;
    public userClientId?: number;
    public deliveryId?: number;

    constructor(props: Order) {
        Object.assign(this, props);
    }
}
