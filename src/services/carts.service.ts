import { Cart, PostCartDTO, PutCartDTO } from '../models';
import { ICartsRepository } from '../interfaces';
import logger from '../utils/logger';

export class CartsService {

    constructor(private cartsRepository: ICartsRepository) { }

    async getCartByClient(clientId: number): Promise<Cart> {

        try {
            console.log('entrei service')
            const response = await this.cartsRepository.getCartByClient(clientId);

            return response;

        } catch (error) {
            throw new Error(error);
        }
    }
}
