import { UsersController } from './users.controller';
import { ProductsController } from './products.controller';
import { OrdersController } from './orders.controller';
import { UsersRepository, AddressesRepository, ProductsRepository, OrdersRepository, OrderItemsRepository } from '../repositories';
import { UsersService, ProductsService, OrdersService, OrderItemsService } from '../services';

const usersRepository = new UsersRepository();
const productsRepository = new ProductsRepository();
const addressesRepository = new AddressesRepository();
const ordersRepository = new OrdersRepository();
const orderItemsRepository = new OrderItemsRepository();

const usersService = new UsersService(usersRepository, addressesRepository);
const productsService = new ProductsService(productsRepository);
const ordersService = new OrdersService(ordersRepository, orderItemsRepository);
const orderItemsService = new OrderItemsService(orderItemsRepository);

const usersController = new UsersController(usersService, ordersService);
const productsController = new ProductsController(productsService);
const ordersController = new OrdersController(ordersService, orderItemsService);



export { usersService, usersController, productsService, productsController, ordersService, ordersController, orderItemsService }
