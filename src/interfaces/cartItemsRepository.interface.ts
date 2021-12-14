import { CartItem } from "../models";
import { PostCartItemDTO } from "../models";
import { PutCartItemDTO } from "../models";

export interface ICartItemsRepository {

  getCartItemsByCart(cartId: number): Promise<CartItem[]>;
  postCartItem(postCartDTO: PostCartItemDTO): Promise<number[]> | null;
  putCartItem(putCartDTO: PutCartItemDTO): Promise<number> | null;
  deleteCartItem(cartItemId: number): Promise<boolean> | null;
}
