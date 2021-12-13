export class OrderItem {
    public id: number;
    public amount: number;
    public unitPrice: number;
    public productId: number;
    public orderId: number;


    constructor(props: OrderItem) {
        Object.assign(this, props);
    }
}
