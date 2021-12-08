import { Product } from '../models';
import { IProductsRepository } from '../interfaces';

export class ProductsService {

    constructor(private productsRepository: IProductsRepository) { }

    async get(): Promise<Product[]> {

        try {

            const response = await this.productsRepository.getProducts();

            return response;

        } catch (error) {
            throw new Error(error);
        }

    }
}
