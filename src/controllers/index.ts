import { UsersController } from './users.controller';
import { ProductsController } from './products.controller';
import { UsersRepository, AddressesRepository, ProductsRepository } from '../repositories';
import { UsersService, ProductsService } from '../services';

const usersRepository = new UsersRepository();
const productsRepository = new ProductsRepository();
const addressesRepository = new AddressesRepository();

const usersService = new UsersService(usersRepository, addressesRepository);
const productsService = new ProductsService(productsRepository);

const usersController = new UsersController(usersService);
const productsController = new ProductsController(productsService);



export { usersService, usersController, productsService, productsController }
