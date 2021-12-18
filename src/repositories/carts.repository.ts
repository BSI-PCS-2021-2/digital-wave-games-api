import { ICartsRepository } from '../interfaces';
import { Cart, PostCartDTO } from '../models';
import { mysqlDatabase } from '../databases';
import logger from '../utils/logger';

export class CartsRepository implements ICartsRepository{

    async getCartByClient(clientId: number): Promise<Cart | null> {

        let cart: Cart | null = null;

        const sql = `SELECT * FROM carrinho where id_cliente=?`;
        try {
            await mysqlDatabase.default.raw(sql, [clientId || null]).then(data => {
                if (data[0].length > 0) {
                    data[0].forEach((result: any) => {

                    cart = {
                      id: result['id'],
                      clientId: result['id_cliente']
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

  async postCart(postCartDTO: PostCartDTO): Promise<number[]> {

    let index: number[] = [];

    try {

        await mysqlDatabase
        .default('carrinho')
        .returning('id')
        .insert([{
            id_cliente: postCartDTO.clientId || null,
        }
        ]).then( insertedIndex => {
            index = insertedIndex;
        })
        .catch((error: any) => {
            logger.error(error);
            throw new Error(error);
        });

    } catch (error: any) {
        logger.error(error);
        throw new Error(error);
    }

    return index;
  }

  async cleanCart(cartId: number): Promise<boolean> {

    console.log('clean cart repository')
      const sql = `DELETE FROM item_carrinho WHERE id_carrinho=?`;
        try {
            await mysqlDatabase.default.raw(sql, [cartId || null]).then()
            .catch(err => {
                logger.error(err);
                throw new Error(err);
            });

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
        return true;
  }



}
