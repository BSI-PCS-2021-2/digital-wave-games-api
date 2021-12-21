import { CartItem, Cart, Product, Order, OrderItem, PostOrderDTO } from '../models';
import { IOrdersRepository, IOrderItemsRepository, ICartItemsRepository, IProductsRepository, ICartsRepository } from '../interfaces';
import logger from '../utils/logger';
import { WalletsRepository } from '../repositories/wallets.repository';

export class OrdersService {

    constructor(
        private ordersRepository: IOrdersRepository,
        private orderItemsRepository: IOrderItemsRepository,
        private walletsRepository: WalletsRepository,
        private cartItemsRepository: ICartItemsRepository,
        private cartsRepository: ICartsRepository,
        private productsRepository: IProductsRepository
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

    async postOrder(postOrderDTO: PostOrderDTO): Promise<number> {
        try {
            
            
            const cartId: number = postOrderDTO.cartId;
            const cart: Cart | null = await this.cartsRepository.getCart(cartId);
            const clientId: number | undefined = cart?.clientId;
            const weight: number | undefined = await this.cartsRepository.getWeight(cartId);
            const expectedDeliveryDate: Date = new Date();
            /***
             * Mudar a data de entrega prevista estática
             */
            expectedDeliveryDate.setDate(new Date().getDate() + 5);

            const order: Order = {
                id: 0,
                totalWeight: weight,
                totalPrice: postOrderDTO.totalPrice,
                expectedDeliveryDate: expectedDeliveryDate,
                purchaseDate: new Date(),
                paymentType: postOrderDTO.paymentTypeId,
                userClientId: clientId,
                deliveryId: postOrderDTO.deliveryId
            }

            const orderId: number[] = await this.ordersRepository.postOrder(order);
            logger.info(`Order with id = '${orderId[0]}' created.`);

            const cartItems: CartItem[] = await this.cartItemsRepository.getCartItemsByCart(cartId);

            cartItems.forEach(async (cartItem) => {
                const product: Product | null = await this.productsRepository.getById(cartItem.productId);
                const unitPrice: number | undefined = product?.price;

                const orderItem: OrderItem = {
                    amount: cartItem.amount,
                    unitPrice: unitPrice,
                    productId: cartItem.productId,
                    orderId: orderId[0]
                }
                logger.info(`Creating Order Item to Order ${orderId} id...`);
                this.orderItemsRepository.postOrderItem(orderItem);
            })

            return orderId[0];
            

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
    }
}
