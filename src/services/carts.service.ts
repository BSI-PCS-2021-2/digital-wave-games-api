import { PostCartDTO, PostCartItemDTO } from '../models';
import { ICartsRepository } from '../interfaces';
import logger from '../utils/logger';

export class CartsService {

    constructor(private cartsRepository: ICartsRepository) { }

    // async postCart(postCartItemDTO: PostCartItemDTO): Promise<number[]> {

    // // TODO
    // }
}
