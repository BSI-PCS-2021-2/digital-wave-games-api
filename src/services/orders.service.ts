import { Order } from '../models';
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

    async getOrderByClient(clientId: number, orderId: number): Promise<Order[]> {

        try {
            const response = await this.ordersRepository.getOrderByClient(clientId, orderId);
            return response;

        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }

    }


    async getById(id: number): Promise<Order> {

        try {
            const response = await this.ordersRepository.getById(id);

            return response;

        } catch (error) {
            throw new Error(error);
        }
    }
}
