// import { knex } from '../../../database/index';
import { IOrderItemsRepository } from '../interfaces';
import { OrderItem, PostOrderItemDTO } from '../models';
import { mysqlDatabase } from '../databases';
import logger from '../utils/logger';

export class OrderItemsRepository implements IOrderItemsRepository {

    async getOrderItemsByOrder(orderId: number): Promise<OrderItem[]> {
      let orderItems: OrderItem[] = [];

      const sql = `SELECT * FROM item_pedido where id_pedido=?;`;

      try {
          await mysqlDatabase.default.raw(sql, [orderId || null]).then(data => {
              if (data[0].length > 0) {
                data[0].forEach(result => {
                    orderItems.push({
                      id: result['id'],
                      amount: result['quantidade'],
                      unitPrice: result['preco_unitario'],
                      productId: result['id_produto'],
                      orderId: result['id_pedido']
                    });

                });
              }

          }).catch(err => {
              logger.error(err);
              throw new Error(err);
          });

      } catch (error) {
          logger.error(error);
          throw new Error(error);
      }

      return orderItems;

    }

    async getOrderItem(id: number): Promise<OrderItem> {

        let orderItem: OrderItem = null;

        const sql = `SELECT * FROM item_pedido where id=?`;
        try {
            await mysqlDatabase.default.raw(sql, [id || null]).then(data => {
                if (data[0].length > 0) {
                    data[0].forEach(result => {

                    orderItem = {
                      id: result['id'],
                      amount: result['quantidade'],
                      unitPrice: result['preco_unitario'],
                      productId: result['id_produto'],
                      orderId: result['id_pedido']
                    };

                  });
                }

            }).catch(err => {
                logger.error(err);
                throw new Error(err);
            });

        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        return orderItemItem;

    }


    async postOrderItem(postOrderItemDTO: PostOrderItemDTO): Promise<number[]> {

        let index: number[] = [];

        try {
            console.log('entrei repositorio')
            await mysqlDatabase
            .default('item_pedido')
            .returning('id')
            .insert([{
                quantidade: postOrderItemDTO.amount || null,
                preco_unitario: postOrderItemDTO.unitPrice || null,
                id_produto: postOrderItemDTO.productId || null,
                id_pedido: postOrderItemDTO.orderId || null,
            }
            ]).then( insertedIndex => {
                index = insertedIndex;
            })
            .catch(err => {
                logger.error(err);
                throw new Error(err);
            });

        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }

        return index;

    }


}
