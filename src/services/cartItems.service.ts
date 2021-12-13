import { CartItem, PostCartItemDTO, PutCartItemDTO } from '../models';
import { ICartItemsRepository } from '../interfaces';
import logger from '../utils/logger';

export class CartItemsService {

    constructor(private cartsRepository: ICartItemsRepository) { }

    async getCartItemsByCart(cartId: number): Promise<CartItem[]> {

        try {
            const response = await this.cartsRepository.getCartItemsByCart(cartId);

            return response;

        } catch (error: any) {
            throw new Error(error);
        }
    }

    // async postCartItem(postCartItemDTO: PostCartItemDTO): Promise<number[]> {
    //     // TODO

    // }

    // async putCartItem(postCartItemDTO: PostCartItemDTO): Promise<number[]> {
    //     // TODO

    // }
}
