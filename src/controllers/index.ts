import { UsersController } from './users.controller';
import { ProductsController } from './products.controller';
import { UsersRepository, AddressesRepository, ProductsRepository, OrdersRepository } from '../repositories';
import { UsersService, ProductsService, OrdersService } from '../services';

const usersRepository = new UsersRepository();
const productsRepository = new ProductsRepository();
const addressesRepository = new AddressesRepository();
const ordersRepository = new OrdersRepository();

const usersService = new UsersService(usersRepository, addressesRepository);
const productsService = new ProductsService(productsRepository);
const ordersService = new OrdersService(ordersRepository);

const usersController = new UsersController(usersService, ordersService);
const productsController = new ProductsController(productsService);



export { usersService, usersController, productsService, productsController, ordersService }
