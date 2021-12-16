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
                        totalWeight: result['peso_total'],
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

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
        return order;

    }

    async postOrder(postOrderDTO: PostOrderDTO): Promise<any> {

        const response = {
            total: '',
            userId: ''
        }

        const sql = 'SELECT sum((SELECT p.preco FROM produto p WHERE p.id = i.id_produto)) as preco_total, (SELECT id FROM usuario_cliente u WHERE u.id = (SELECT c.id_cliente FROM carrinho c WHERE c.id = i.id_carrinho)) as id_usuario FROM item_carrinho i where i.id_carrinho = ?;'

        try {
            await mysqlDatabase.default.raw(sql, [postOrderDTO.cartId || null]).then(data => {
                if (data[0].length > 0) {
                    data[0].forEach((result: any) => {
                        response.total = result['preco_total'];
                        response.userId = result['id_usuario'];
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

        return response;
    }
}
