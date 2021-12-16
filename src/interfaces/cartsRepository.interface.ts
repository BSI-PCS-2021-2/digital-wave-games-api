import { PostCartDTO, Cart } from '../models';

export interface ICartsRepository {

  postCart(postCartDTO: PostCartDTO): Promise<number[]> | null;
  getCartByClient(clientId: number): Promise<Cart | null>;
  
}
