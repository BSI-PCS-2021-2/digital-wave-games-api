import { ICartItemsRepository } from '../interfaces';
import { PutCartItemDTO, PostCartItemDTO, CartItem } from '../models';
import { mysqlDatabase } from '../databases';
import logger from '../utils/logger';

export class CartItemsRepository implements ICartItemsRepository{

  async getCartItemsByCart(cartId: number): Promise<CartItem[]> {
    let cartItems: CartItem[] = [];
    
    const sql = `SELECT * FROM item_carrinho where id_carrinho=?`;
    try {
        await mysqlDatabase.default.raw(sql, [cartId || null]).then(data => {
            if (data[0].length > 0) {
                data[0].forEach((result: { [x: string]: any; }) => {

                cartItems.push({
                  cartId: result['id_carrinho'],
                  clientId: result['id_usuario'],
                  productId: result['id_produto'],                  
                  amount: result['quantidade']
                });

              });
            }

        }).catch(err => {
            logger.error(err);
            throw new Error(err);
        });

    } catch (error: any) {
        logger.error(error);
        throw new Error(error);
    }

    return cartItems;
  }

  // postCartItem(postCartDTO: PostCartItemDTO): Promise<number[]> {
  //  //TODO
  // }

  // putCartItem(putCartDTO: PutCartItemDTO): Promise<number> {
  //  //TODO
  // }

  // deleteCartItem(cartItemId: number): Promise<boolean> {
  //   // TODO 
  // }
 


}
