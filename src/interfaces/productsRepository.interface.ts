import { Product, PostProductDTO, PutProductDTO, Gender, Platform, Publisher, RatingSystem } from '../models';

export interface IProductsRepository {

    getProducts(): Promise<Product[]>;
    getById(id: number): Promise<Product | null>;
    postProduct(dto: PostProductDTO): Promise<number[] | null>;
    putProduct(dto: PutProductDTO): Promise<void>;
    deleteProduct(id: number): Promise<void>;
    getGender(id: number): Promise<Gender | undefined>;
    getRatingSystem(id: number): Promise<RatingSystem | undefined>;
    getPublisher(id: number): Promise<Publisher | undefined>;
    getPlatform(id: number): Promise<Platform | undefined>;


}
