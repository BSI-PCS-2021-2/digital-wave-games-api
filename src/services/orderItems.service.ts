import { OrderItem, PostOrderItemDTO } from '../models';
import { IOrderItemsRepository } from '../interfaces';
import logger from '../utils/logger';

export class OrderItemsService {

    constructor(private orderItemsRepository: IOrderItemsRepository) { }

    async getOrderItemsByOrder(orderId: number): Promise<OrderItem[]> {
        try {
            const response = await this.orderItemsRepository.getOrderItemsByOrder(orderId);
            return response;

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

    }


    async getOrderItem(id: number): Promise<OrderItem> {

        try {
            const response = await this.orderItemsRepository.getOrderItem(id);

            return response;

        } catch (error: any) {
            throw new Error(error);
        }
    }

    async postOrderItem(postOrderItemDTO: PostOrderItemDTO): Promise<number[]> {
        try {

            const response: number[] = await this.orderItemsRepository.postOrderItem(postOrderItemDTO);
            return response;

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

    }
}
