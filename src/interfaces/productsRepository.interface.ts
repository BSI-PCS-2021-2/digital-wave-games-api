import { Product } from '../models';

export interface IProductsRepository {

    getProducts(): Promise<Product[]>;
    getById(id: number): Promise<Product | null>;

}
