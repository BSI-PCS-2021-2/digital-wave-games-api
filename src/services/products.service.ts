import { PostProductDTO, Product, PutProductDTO } from '../models';
import { IProductsRepository } from '../interfaces';
import logger from '../utils/logger';

export class ProductsService {

    constructor(private productsRepository: IProductsRepository) { }

    async get(): Promise<Product[]> {

        try {

            const response = await this.productsRepository.getProducts();

            return response;

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

    }

    async getById(id: number): Promise<Product | null> {

        try {
            const response = await this.productsRepository.getById(id);
            return response;

        } catch (error: any) {
            throw new Error(error);
        }
    }

    async delete(id: number): Promise<void> {
        try {

            await this.productsRepository.deleteProduct(id);

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
    }

    async update(dto: PutProductDTO): Promise<void> {
        try {


            await this.productsRepository.putProduct(dto);

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

    }

    async post(dto: PostProductDTO): Promise<void> {
        try {

            await this.productsRepository.postProduct(dto);

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

    }
}
