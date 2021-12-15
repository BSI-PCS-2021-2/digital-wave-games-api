import { PostCartDTO } from '../models';
import { ICartsRepository } from '../interfaces';
import logger from '../utils/logger';

export class CartsService {

    constructor(private cartsRepository: ICartsRepository) { }

    async postCart(postCartDTO: PostCartDTO): Promise<number[] | null> {

        try {

            const response: number[] | null = await this.cartsRepository.postCart(postCartDTO);

            return response;

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
        
    }
}
