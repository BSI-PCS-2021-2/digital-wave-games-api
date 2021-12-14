import { ICartsRepository } from '../interfaces';
import { PostCartDTO } from '../models';
import { mysqlDatabase } from '../databases';
import logger from '../utils/logger';

export class CartsRepository implements ICartsRepository{

  //postCart(postCartDTO: PostCartDTO): Promise<number[]>;

  postCart(postCartDTO: PostCartDTO): Promise<number[]> | null {
    return null;
  }

}
