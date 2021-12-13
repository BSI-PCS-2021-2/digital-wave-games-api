import { Order, PostOrderDTO } from '../models';

export interface IOrderRepository {

    getOrdersByClient(clientId: number): Promise<Order[]>;
    getOrder(id: number): Promise<Order>;
    postOrder(postOrderDTO: PostOrderDTO): Promise<number>;


}
