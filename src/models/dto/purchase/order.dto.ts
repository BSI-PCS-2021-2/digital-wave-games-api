export class OrderDTO {
    public totalPrice: number;
    public totalWeight: number;
    public expectedDeliveryDate: Date;
    public purchaseDate: Date;
    public paymentType: string;
    public userClientId: number;
}
