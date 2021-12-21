import { OrderItem, PostOrderItemDTO } from '../models';

export interface IOrderItemsRepository {

    getOrderItemsByOrder(orderId: number): Promise<OrderItem[]>;
    getOrderItem(id: number): Promise<OrderItem | null>;
    postOrderItem(orderItem: OrderItem): Promise<number[]>;

}
