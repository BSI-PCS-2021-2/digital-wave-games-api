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
              if (data[0].length > 0) {
                data[0].forEach((product: any) => {

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

      } catch (error: any) {
          logger.error(error);
          throw new Error(error);
      }

      return products;

    }

    async getById(id: number): Promise<Product | null> {

        let product: Product | null = null;

        const sql = `SELECT * FROM produto where id=?`;
        try {
            await mysqlDatabase.default.raw(sql, [id || null]).then(data => {
                if (data[0].length > 0) {
                        product = data[0];
                        // criar novo objeto com as colunas
                }

            }).catch(err => {
                logger.error(err);
                throw new Error(err);
            });

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

        return product;

    }


}
