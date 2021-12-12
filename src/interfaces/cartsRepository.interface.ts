import { PostCartDTO, PutCartDTO, Cart } from '../models';

export interface ICartsRepository {

  getCartByClient(clientId: number): Promise<Cart>;
  postCart(postCartDTO: PostCartDTO): Promise<number[]>;
  putCartByClient(putCartDTO: PutCartDTO): Promise<number>;
}
