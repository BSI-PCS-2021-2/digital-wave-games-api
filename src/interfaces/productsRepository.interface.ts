import { Product, PostProductDTO, PutProductDTO } from '../models';

export interface IProductsRepository {

    getProducts(): Promise<Product[]>;
    getById(id: number): Promise<Product | null>;
    postProduct(dto: PostProductDTO): Promise<number[] | null>;
    putProduct(dto: PutProductDTO): Promise<void>;
    deleteProduct(id: number): Promise<void>;

}
