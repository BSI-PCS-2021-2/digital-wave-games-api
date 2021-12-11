import { OrderItem, OrderItemDTO } from '../models';

export interface IOrderItemsRepository {

    getOrderItemsByOrder(orderId: number): Promise<OrderItem[]>;
    getOrderItem(id: number): Promise<OrderItem>;
    postOrderItem(orderItem: OrderItemDTO): Promise<number[]>;

}
