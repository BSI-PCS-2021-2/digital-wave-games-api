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

                if (data[0].length > 0) {
                    data[0].forEach(product => {
                        products.push({
                            name: product['nome'],
                            price: product['preco'],
                            rate: product['nota'],
                            description: product['descricao']
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

        return products;

    }

}
