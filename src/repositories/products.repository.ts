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
                        price: product['preco'],
                        amount: product['quantidade'],
                        rating: product['avaliacao'],
                        description: product['descricao'],
                        weight: product['peso'],
                        height: product['altura'],
                        deeph: product['profundidade'],
                        releaseDate: product['data_lancamento'],
                        genderId: product['id_genero'],
                        platformId: product['id_plataforma'],
                        ratingSystemId: product['id_classificacao_indicativa'],
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
                    data[0].forEach(result => {

                    product = {
                      id: result['id'],
                      name: result['nome'],
                      price: result['preco'],
                      amount: result['quantidade'],
                      rating: result['avaliacao'],
                      description: result['descricao'],
                      weight: result['peso'],
                      height: result['altura'],
                      deeph: result['profundidade'],
                      releaseDate: result['data_lancamento'],
                      genderId: result['id_genero'],
                      platformId: result['id_plataforma'],
                      ratingSystemId: result['id_classificacao_indicativa'],
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

        return product;

    }


}
