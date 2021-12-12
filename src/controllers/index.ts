import { UsersController,  } from './users.controller';
import { ProductsController } from './products.controller';
import { ConfirmationCodesController } from './confirmationCodesController';
import { OrdersController } from './orders.controller';
import { UsersRepository, AddressesRepository, ProductsRepository, ConfirmationCodesRepository, OrdersRepository, OrderItemsRepository } from '../repositories';
import { UsersService, ProductsService, ConfirmationCodesService,  OrdersService, OrderItemsService } from '../services';

const usersRepository = new UsersRepository();
const productsRepository = new ProductsRepository();
const addressesRepository = new AddressesRepository();
const confirmationCodesRepository = new ConfirmationCodesRepository();
const ordersRepository = new OrdersRepository();
const orderItemsRepository = new OrderItemsRepository();

const usersService = new UsersService(usersRepository, addressesRepository, confirmationCodesRepository);
const productsService = new ProductsService(productsRepository);
const confirmationCodesService = new ConfirmationCodesService(confirmationCodesRepository);
const ordersService = new OrdersService(ordersRepository, orderItemsRepository);
const orderItemsService = new OrderItemsService(orderItemsRepository);

const usersController = new UsersController(usersService, ordersService);
const productsController = new ProductsController(productsService);
const confirmationCodesController = new ConfirmationCodesController(confirmationCodesService);
const ordersController = new OrdersController(ordersService, orderItemsService);



export { usersService, usersController, productsService, productsController, confirmationCodesController, ordersService, ordersController, orderItemsService }
