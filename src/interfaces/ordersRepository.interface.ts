import { Order } from '../models';

export interface IOrderRepository {

    getOrders(): Promise<Order[]>;
    getById(id: number): Promise<Order>;
    getOrdersByClient(clientId: number);
    getOrderByClient(clientId: number, orderId: number)
    // postOrder();
    

}
