import { Order, PostOrderDTO } from '../models';
import { IOrdersRepository, IOrderItemsRepository } from '../interfaces';
import logger from '../utils/logger';
import { WalletsRepository } from '../repositories/wallets.repository';

export class OrdersService {

    constructor(
        private ordersRepository: IOrdersRepository,
        private orderItemsRepository: IOrderItemsRepository,
        private walletsRepository: WalletsRepository
        ) { }

    async getOrdersByClient(clientId: number): Promise<Order[]> {
        try {
            const response = await this.ordersRepository.getOrdersByClient(clientId);
            return response;

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

    }

    async getOrder(orderId: number): Promise<Order | null> {

        try {
            const response = await this.ordersRepository.getOrder(orderId);
            return response;


        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
    }

    async postOrder(postOrderDTO: PostOrderDTO): Promise<boolean> {
        try {

            const response1: any = await this.ordersRepository.postOrder(postOrderDTO);

            const response2 = await this.walletsRepository.decreaseFunds(response1.total, response1.userId);

            // const response: number[] = await this.ordersRepository.postOrder(postOrderDTO);

            // postOrderDTO.orderItems.forEach(postOrderItemDTO => {

            //   postOrderItemDTO.orderId = response[0];

            //   this.orderItemsRepository.postOrderItem(postOrderItemDTO);
            // });

            return response2;

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

    }
}
