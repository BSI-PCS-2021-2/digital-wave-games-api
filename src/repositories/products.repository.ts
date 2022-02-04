import { IProductsRepository } from '../interfaces';
import { Gender, Platform, PostProductDTO, Product, Publisher, PutProductDTO, RatingSystem } from '../models';
import { mysqlDatabase } from '../databases';
import logger from '../utils/logger';
import { result } from 'lodash';

export class ProductsRepository implements IProductsRepository {

    async getProducts(): Promise<Product[]> {

        let products: Product[] = [];

        const sql = `SELECT * FROM produto;`;

        try {
            await mysqlDatabase.default.raw(sql).then(data => {
                if (data[0].length > 0) {
                    data[0].forEach(async(result: any) => {
                        products.push({
                            id: result['id'],
                            name: result['nome'],
                            price: result['preco'],
                            amount: result['quantidade'],
                            description: result['descricao'],
                            releaseDate: result['data_lancamento'],
                            imgUrl: result['imgUrl'],
                            youtubeIds: result['youtube_ids'].split(',')
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
                    data[0].forEach(async(result: any) => {
                        product = {
                            id: result['id'],
                            name: result['nome'],
                            price: result['preco'],
                            amount: result['quantidade'],
                            description: result['descricao'],
                            releaseDate: result['data_lancamento'],
                            imgUrl: result['imgUrl'],
                            youtubeIds: result['youtube_ids'].split(',')
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

    async postProduct(dto: PostProductDTO): Promise<number[] | null> {
        let index: number[] | null = null;
        try {
            await mysqlDatabase.default('produto')
                .returning('id')
                .insert([{
                    nome: dto.name || null,
                    preco: dto.price || null,
                    quantidade: dto.amount || null,
                    descricao: dto.description || null,
                    data_lancamento: dto.releaseDate || null,
                    imgUrl: dto.imgUrl || null,
                    youtube_ids: dto.youtubeIds?.join(','),
                    id_plataforma: dto.platformId || null,
                    id_publisher: dto.publisherId || null,
                    id_classificacao_indicativa: dto.ratingSystemId || null,
                    id_genero: dto.genderId || null
                }])
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

    async putProduct(dto: PutProductDTO): Promise<void> {
        try {
            await mysqlDatabase
                .default("produto")
                .update({
                    nome: dto.name || null,
                    preco: dto.price || null,
                    quantidade: dto.amount || null,
                    descricao: dto.description || null,
                    data_lancamento: dto.releaseDate || null,
                    imgUrl: dto.imgUrl || null,
                    youtube_ids: dto.youtubeIds?.join(','),
                    id_plataforma: dto.platformId || null,
                    id_publisher: dto.publisherId || null,
                    id_classificacao_indicativa: dto.ratingSystemId || null,
                    id_genero: dto.genderId || null
            })
            .where({id: dto.id})
        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
    }

    async deleteProduct(id: number): Promise<void> {
        try {

            mysqlDatabase
            .default('produto')
            .delete()
            .where({id: id})
            .catch((error: any) => {
              logger.error(error);
              throw new Error(error);
          });
          
        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
    }

    async getGender(id: number): Promise<Gender | undefined> {
        let gender: Gender | undefined = undefined;
        const sql = `SELECT g.id, g.nome FROM genero as g JOIN produto as p ON g.id = p.id_genero WHERE p.id=?`;
        try {
            await mysqlDatabase.default.raw(sql, [id || null]).then(data => {
                if (data[0].length > 0) {
                    data[0].forEach((result: any) => {

                    gender = {
                      id: result['id'],
                      name: result['nome']
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
        return gender;
    }


    async getPlatform(id: number): Promise<Platform | undefined> {
        let platform: Platform | undefined = undefined;

        const sql = `SELECT pa.id, pa.nome FROM plataforma as pa JOIN produto as p ON pa.id = p.id_plataforma WHERE p.id=?`;
        try {
            await mysqlDatabase.default.raw(sql, [id || null]).then(data => {
                if (data[0].length > 0) {
                    data[0].forEach((result: any) => {

                    platform = {
                      id: result['id'],
                      name: result['nome']
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

        return platform;
    }


    async getPublisher(id: number): Promise<Publisher | undefined> {
        let publisher: Publisher | undefined = undefined;

        const sql = `SELECT pu.id, pu.nome FROM publisher as pu JOIN produto as p ON pu.id = p.id_publisher WHERE p.id=?`;
        try {
            await mysqlDatabase.default.raw(sql, [id || null]).then(data => {
                if (data[0].length > 0) {
                    data[0].forEach((result: any) => {

                    publisher = {
                      id: result['id'],
                      name: result['nome']
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

        return publisher;
    }

    async getRatingSystem(id: number): Promise<RatingSystem | undefined> {
        let ratingSystem: RatingSystem | undefined = undefined;

        const sql = `SELECT c.id, c.nome FROM classificacao_indicativa as c JOIN produto as p ON c.id = p.id_classificacao_indicativa WHERE p.id=?`;
        try {
            await mysqlDatabase.default.raw(sql, [id || null]).then(data => {
                if (data[0].length > 0) {
                    data[0].forEach((result: any) => {

                    ratingSystem = {
                      id: result['id'],
                      name: result['nome']
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

        return ratingSystem;
    }


}
