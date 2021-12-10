import { Product } from '../models';
import { IProductsRepository } from '../interfaces';
import logger from '../utils/logger';

export class ProductsService {

    constructor(private productsRepository: IProductsRepository) { }

    async get(): Promise<Product[]> {

        try {

            const response = await this.productsRepository.getProducts();

            return response;

        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }

    }

    async get(id: number): Promise<Product> {

        try {
            console.log(id);
            const response = await this.productsRepository.get(id);

            return response;

        } catch (error) {
            throw new Error(error);
        }
    }
}
