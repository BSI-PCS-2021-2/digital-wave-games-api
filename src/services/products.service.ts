import { Gender, Platform, PostProductDTO, Product, Publisher, PutProductDTO, RatingSystem } from '../models';
import { IProductsRepository } from '../interfaces';
import logger from '../utils/logger';

export class ProductsService {

    constructor(private productsRepository: IProductsRepository) { }

    async get(): Promise<Product[]> {

        let response: Product[] = [];

        try {
            const products: Product[] = await this.productsRepository.getProducts();
            for (let product of products) {
                const id: number = product.id != null ? product.id : -1;
                const gender: Gender | undefined = await this.productsRepository.getGender(id)
                const publisher: Publisher | undefined = await this.productsRepository.getPublisher(id)
                const platform: Platform | undefined = await this.productsRepository.getPlatform(id)
                const ratingSystem: RatingSystem | undefined = await this.productsRepository.getRatingSystem(id)
                response.push({
                    id: id,
                    name: product?.name,
                    description: product?.description,
                    price: product?.price,
                    amount: product?.amount,
                    releaseDate: product?.releaseDate,
                    imgUrl: product.imgUrl,
                    gender: gender,
                    platform: platform,
                    publisher: publisher,
                    ratingSystem: ratingSystem
                });
            }

            return response;

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

    }

    async getById(id: number): Promise<Product | null> {
        let response: Product | null = null;

        try {
            const product: Product | null = await this.productsRepository.getById(id);
            const gender: Gender | undefined = await this.productsRepository.getGender(id)
            const publisher: Publisher | undefined = await this.productsRepository.getPublisher(id)
            const platform: Platform | undefined = await this.productsRepository.getPlatform(id)
            const ratingSystem: RatingSystem | undefined = await this.productsRepository.getRatingSystem(id)
            response = {
                id: product?.id,
                name: product?.name,
                description: product?.description,
                price: product?.price,
                amount: product?.amount,
                releaseDate: product?.releaseDate,
                imgUrl: product?.imgUrl,
                gender: gender,
                platform: platform,
                publisher: publisher,
                ratingSystem: ratingSystem
            }

        } catch (error: any) {
            throw new Error(error);
        }
        return response;
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
