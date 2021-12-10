// import { knex } from '../../../database/index';
import { IProductsRepository } from '../interfaces';
import { Product } from '../models';
import { mysqlDatabase } from '../databases';
import logger from '../utils/logger';

export class ProductsRepository implements IProductsRepository {

    async getProducts(): Promise<Product[]> {

      let products: Product[] = [];

      const sql = `SELECT * FROM produto;`;

      try {
          await mysqlDatabase.default.raw(sql).then(data => {
              console.log(data);
              if (data[0].length > 0) {
                console.log(data[0]);
                data[0].forEach(product => {

                    products.push({
                        id: product['id'],
                        name: product['nome'],
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

      return users;

    }

    async get(id: number): Promise<Product> {

        let product: Product = {};

        const sql = `SELECT * FROM produto where id=?`;
        try {
            await mysqlDatabase.default.raw(sql, [id || null]).then(data => {
                if (data[0].length > 0) {
                        product = data[0];
                }

            }).catch(err => {
                logger.error(err);
                throw new Error(err);
            });

        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        console.log(product)
        return product;

    }


}
