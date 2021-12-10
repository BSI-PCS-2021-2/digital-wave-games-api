// import { knex } from '../../../database/index';
import { IOrdersRepository } from '../interfaces';
import { Order } from '../models';
import { mysqlDatabase } from '../databases';
import logger from '../utils/logger';

export class OrdersRepository implements IOrdersRepository {

    async getOrdersByClient(clientId: number): Promise<Order[]> {
      let orders: Order[] = [];

      const sql = `SELECT * FROM pedido where id_cliente = ?;`;

      try {
          await mysqlDatabase.default.raw(sql, [clientId || null]).then(data => {
              if (data[0].length > 0) {
                console.log(data[0]);
                data[0].forEach(order => {
                    orders.push({
                        id: order['id'],
                        totalPrice: order['preco_total'],
                        totalWeight: order['peso_total'],
                        expectedDeliveryDate: order['data_previsao_entrega'],
                        purchaseDate: order['data_compra'],
                        paymentType: order['id_forma_pagamento'],
                        userClientId: order['id_cliente']
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

      return orders;

    }

    async getById(id: number): Promise<Order> {

        let order: Order = null;

        const sql = `SELECT * FROM pedido where id=?`;
        try {
            await mysqlDatabase.default.raw(sql, [id || null]).then(data => {
                if (data[0].length > 0) {
                    console.log(data[0]);
                    data[0].forEach(result => {

                    order = {
                      id: order['id'],
                      totalPrice: order['preco_total'],
                      totalWeight: order['peso_total'],
                      expectedDeliveryDate: order['data_previsao_entrega'],
                      purchaseDate: order['data_compra'],
                      paymentType: order['id_forma_pagamento'],
                      userClientId: order['id_cliente']
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
        return order;

    }

    async getOrderByClient(clientId: number, orderId: number): Promise<Order> {
      let order: Order = null;

      const sql = `SELECT * FROM pedido where id_cliente = ? AND id = ?;`;

      try {
          await mysqlDatabase.default.raw(sql, [clientId || null, orderId || null]).then(data => {
              if (data[0].length > 0) {
                console.log(data[0]);
                data[0].forEach(result => {
                  order = {
                    id: result['id'],
                    totalPrice: result['preco_total'],
                    totalWeight: result['peso_total'],
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

      } catch (error) {
          logger.error(error);
          throw new Error(error);
      }

      return order;

    }


}
