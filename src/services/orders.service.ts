import { Order, PostOrderDTO } from '../models';
import { IOrdersRepository } from '../interfaces';
import logger from '../utils/logger';

export class OrdersService {

    constructor(private ordersRepository: IOrdersRepository) { }

    async getOrdersByClient(clientId: number): Promise<Order[]> {
        try {
            const response = await this.ordersRepository.getOrdersByClient(clientId);
            return response;

        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }

    }

    async getOrder(orderId: number): Promise<Order[]> {

        try {
            const response = await this.ordersRepository.getOrder(orderId);
            return response;

        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    async post(postOrderDTO: PostOrderDTO): Promise<number[]> {
        console.log('entrei service')
        try {

            const response: number[] = await this.ordersRepository.postOrder(postOrderDTO);
            return response;

        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }

    }
}
