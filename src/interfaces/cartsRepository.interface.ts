import { PostCartDTO, Cart } from '../models';

export interface ICartsRepository {

  getCart(cartId: number): Promise<Cart | null>;
  postCart(postCartDTO: PostCartDTO): Promise<number[]> | null;
  getCartByClient(clientId: number): Promise<Cart | null>;
  cleanCart(cartId: number): Promise<boolean>;
  getTotalPrice(cartId: number): Promise<number>;
  getWeight(cartId: number): Promise<number>;
}
