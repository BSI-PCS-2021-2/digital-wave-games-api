import { PostCartDTO } from '../models';

export interface ICartsRepository {

  postCart(postCartDTO: PostCartDTO): Promise<number[]>;
  
}
