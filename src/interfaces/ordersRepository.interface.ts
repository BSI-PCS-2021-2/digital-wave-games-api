import { Order, PostOrderDTO } from '../models';

export interface IOrdersRepository {

    getOrdersByClient(clientId: number): Promise<Order[]>;
    getOrder(id: number): Promise<Order | null>;
    postOrder(postOrderDTO: PostOrderDTO): Promise<number[]>;


}
