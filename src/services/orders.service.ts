import { Order, PostOrderDTO, PostOrderItemDTO } from '../models';
import { IOrdersRepository, IOrderItemsRepository } from '../interfaces';
import logger from '../utils/logger';

export class OrdersService {

    constructor(private ordersRepository: IOrdersRepository, private orderItemsRepository: IOrderItemsRepository) { }

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
        try {

            const response: number[] = await this.ordersRepository.postOrder(postOrderDTO);

            postOrderDTO.orderItems.forEach(postOrderItemDTO => {

              postOrderItemDTO.orderId = response[0];

              console.log(postOrderItemDTO.orderId)
              this.orderItemsRepository.postOrderItem(postOrderItemDTO);
            });

            return response;

        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }

    }
}
