import { IOrdersRepository } from '../interfaces';
import { Order, PostOrderDTO } from '../models';
import { mysqlDatabase } from '../databases';
import logger from '../utils/logger';

export class OrdersRepository implements IOrdersRepository {

    

    async getOrdersByClient(clientId: number): Promise<Order[]> {
      let orders: Order[] = [];

      const sql = `SELECT * FROM pedido where id_cliente = ?;`;

      try {
          await mysqlDatabase.default.raw(sql, [clientId || null]).then(data => {
              if (data[0].length > 0) {
                data[0].forEach((result: any) => {
                    orders.push({
                        id: result['id'],
                        totalPrice: result['preco_total'],
                        expectedDeliveryDate: result['data_previsao_entrega'],
                        purchaseDate: result['data_compra'],
                        paymentType: result['id_forma_pagamento'],
                        userClientId: result['id_cliente']
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

      return orders;

    }

    async getOrder(id: number): Promise<Order | null> {

        let order: Order | null = null;

        const sql = `SELECT * FROM pedido where id=?`;

        try {
            await mysqlDatabase.default.raw(sql, [id || null]).then(data => {
                if (data[0].length > 0) {
                    data[0].forEach((result: any) => {

                    order = {
                      id: result['id'],
                      totalPrice: result['preco_total'],
                      expectedDeliveryDate: result['data_previsao_entrega'],
                      purchaseDate: result['data_compra'],
                      paymentType: result['id_forma_pagamento'],
                      userClientId: result['id_cliente']
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
        return order;

    }

    async postOrder(order: Order): Promise<any> {

        let index: number[] = [];

        try {
            await mysqlDatabase
            .default('pedido')
            .returning('id')
            .insert([{
                preco_total: order.totalPrice || null,
                data_previsao_entrega: order.expectedDeliveryDate || null,
                data_compra: order.purchaseDate || null,
                id_forma_pagamento: order.paymentType || null,
                id_cliente: order.userClientId || null,
                id_transportadora: order.deliveryId || null
            }
            ]).then( insertedIndex => {
                index = insertedIndex;
            })
            .catch(err => {
                logger.error(err);
                throw new Error(err);
            });

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

        return index;

    }
}
