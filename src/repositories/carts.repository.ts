import { ICartsRepository } from '../interfaces';
import { PostAddressDTO, PutCartDTO, Cart } from '../models';
import { mysqlDatabase } from '../databases';
import logger from '../utils/logger';

export class CartsRepository implements ICartRepository{

  async getCartByClient(clientId: number): Promise<Cart[]> {
    let cart: Cart | null = null;
    const sql = `SELECT * FROM carrinho_view where id_usuario=?`;
    console.log('entrei repositorio')
    try {
        await mysqlDatabase.default.raw(sql, [clientId || null]).then(data => {
            if (data[0].length > 0) {
                data[0].forEach(result => {

                cart = {
                  cartId: result['id_carrinho'],
                  productId: result['id_produto'],
                  productName: result['nome_produto'],
                  clientId: result['id_usuario'],
                  amount: result['quantidade']
                };

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

    return cart;
  }

  // postCart(postCartDTO: PostCartDTO): Promise<number[]> {
  //  TODO
  // }

  // putCart(putCartDTO: PutCartDTO): Promise<number> {
  //  TODO
  // }


}
