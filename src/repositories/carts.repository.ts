import { ICartsRepository } from '../interfaces';
import { PostCartDTO } from '../models';
import { mysqlDatabase } from '../databases';
import logger from '../utils/logger';

export class CartsRepository implements ICartsRepository{

  async postCart(postCartDTO: PostCartDTO): Promise<number[]> {

    let index: number[] = [];

    try {

        await mysqlDatabase
        .default('carrinho')
        .returning('id')
        .insert([{
            id_cliente: postCartDTO.clientId || null,
        }
        ]).then( insertedIndex => {
            index = insertedIndex;
        })
        .catch((error: any) => {
            logger.error(error);
            throw new Error(error);
        });

    } catch (error: any) {
        logger.error(error);
        throw new Error(error);
    }

    return index;
  }

}
