import { PostOrderItemDTO } from './orderItem.dto';

export class OrderDTO {
    public totalPrice: number;
    public totalWeight: number;
    public expectedDeliveryDate: Date;
    public purchaseDate: Date;
    public paymentType: string;
    public userClientId: number;
    public orderItems: PostOrderItemDTO[];
}
