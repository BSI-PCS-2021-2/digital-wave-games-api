import { PostOrderItemDTO } from './postOrderItem.dto';

export interface PostOrderDTO {
    totalPrice: number;
    totalWeight: number;
    expectedDeliveryDate: Date;
    purchaseDate: Date;
    paymentType: string;
    userClientId: number;
    orderItems: PostOrderItemDTO[];
}
