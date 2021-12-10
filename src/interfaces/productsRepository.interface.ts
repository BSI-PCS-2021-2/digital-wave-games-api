import { Product } from '../models';

export interface IProductsRepository {

    getProducts(): Promise<Product[]>;
    getById(): Promise<Product>;

}
