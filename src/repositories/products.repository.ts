import { IProductsRepository } from '../interfaces';
import { Gender, Platform, PostProductDTO, Product, Publisher, PutProductDTO, RatingSystem } from '../models';
import { mysqlDatabase } from '../databases';
import logger from '../utils/logger';

export class ProductsRepository implements IProductsRepository {

    async getProducts(): Promise<Product[]> {

        let products: Product[] = [];

        const sql = `SELECT * FROM produto;`;

        try {
            await mysqlDatabase.default.raw(sql).then(data => {
                if (data[0].length > 0) {
                    data[0].forEach(async (result: any) => {
                        let gender: Gender | undefined = await this.getGender(result['id_genero']);
                        let publisher: Publisher | undefined = await this.getPublisher(result['id_publisher']);
                        let platform: Platform | undefined = await this.getPlatform(result['id_plataforma']);
                        let ratingSystem: RatingSystem | undefined = await this.getRatingSystem(result['id_classificacao_indicativa']);
                        products.push({
                            id: result['id'],
                            name: result['nome'],
                            price: result['preco'],
                            amount: result['quantidade'],
                            description: result['descricao'],
                            releaseDate: result['data_lancamento'],
                            gender: gender,
                            platform: platform,
                            ratingSystem: ratingSystem,
                            publisher: publisher
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
                    let gender: Gender | undefined = await this.getGender(result['id_genero']);
                    let publisher: Publisher | undefined = await this.getPublisher(result['id_publisher']);
                    let platform: Platform | undefined = await this.getPlatform(result['id_plataforma']);
                    let ratingSystem: RatingSystem | undefined = await this.getRatingSystem(result['id_classificacao_indicativa']);
                    product = {
                      id: result['id'],
                      name: result['nome'],
                      price: result['preco'],
                      amount: result['quantidade'],
                      description: result['descricao'],
                      releaseDate: result['data_lancamento'],
                      gender: {id: 1, name: "test"},
                      platform: {id: 1, name: "test"},
                      ratingSystem: {id: 1, name: "test"},
                      publisher: {id: 1, name: "test"}
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

    private async getGender(id: number): Promise<Gender | undefined> {
        let gender: Gender | undefined = undefined;

        const sql = `SELECT * FROM genero where id=?`;
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


    private async getPlatform(id: number): Promise<Platform | undefined> {
        let platform: Platform | undefined = undefined;

        const sql = `SELECT * FROM plataforma where id=?`;
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


    private async getPublisher(id: number): Promise<Publisher | undefined> {
        let publisher: Publisher | undefined = undefined;

        const sql = `SELECT * FROM publisher where id=?`;
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

    private async getRatingSystem(id: number): Promise<RatingSystem | undefined> {
        let ratingSystem: RatingSystem | undefined = undefined;

        const sql = `SELECT * FROM classificacao_indicativa where id=?`;
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
