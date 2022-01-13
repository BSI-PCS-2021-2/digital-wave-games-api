import { ICartsRepository } from '../interfaces';
import { Cart, PostCartDTO } from '../models';
import { mysqlDatabase } from '../databases';
import logger from '../utils/logger';

export class CartsRepository implements ICartsRepository{

    async getCart(cartId: number): Promise<Cart | null> {

        let cart: Cart | null = null;

        const sql = `SELECT * FROM carrinho where id=?`;
        try {
            await mysqlDatabase.default.raw(sql, [cartId || null]).then(data => {
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

    async getTotalPrice(cartId: number): Promise<number> {

        let totalPrice = 0;

        const sql = `SELECT sum(ic.quantidade * p.preco) as sum FROM item_carrinho as ic join produto as p on ic.id_produto = p.id where id_carrinho=?`;
        try {
            await mysqlDatabase.default.raw(sql, [cartId || null]).then(data => {
                if (data[0].length > 0) {
                    data[0].forEach((result: any) => {

                    totalPrice = result['sum'];
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

        return totalPrice;

    }

    async getWeight(cartId: number): Promise<number> {

        let weight = 0;

        const sql = `SELECT sum(ic.quantidade * p.peso) as sum FROM item_carrinho as ic join produto as p on ic.id_produto = p.id where id_carrinho=?`;
        try {
            await mysqlDatabase.default.raw(sql, [cartId || null]).then(data => {
                if (data[0].length > 0) {
                    data[0].forEach((result: any) => {

                        weight = result['sum'];
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
        console.log(weight);
        return weight;

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
