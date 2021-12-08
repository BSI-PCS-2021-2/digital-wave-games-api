import { UsersController } from './users.controller';
import { UsersRepository } from '../repositories';
import { UsersService } from '../services';
import { ProductsController } from './products.controller';
import { ProductsRepository } from '../repositories';
import { ProductsService } from '../services';

const usersRepository = new UsersRepository();
const productsRepository = new ProductsRepository();

const usersService = new UsersService(usersRepository);
const productsService = new ProductsService(productsRepository);

const usersController = new UsersController(usersService);
const productsController = new ProductsController(productsService);



export { usersService, usersController, productsService, productsController }
