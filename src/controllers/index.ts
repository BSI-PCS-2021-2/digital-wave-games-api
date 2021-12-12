import { UsersController,  } from './users.controller';
import { ProductsController } from './products.controller';
import { ConfirmationCodesController } from './confirmationCodesController';
import { OrdersController } from './orders.controller';
import { UsersRepository, AddressesRepository, ProductsRepository, ConfirmationCodesRepository, OrdersRepository, OrderItemsRepository, CartsRepository } from '../repositories';
import { UsersService, ProductsService, ConfirmationCodesService,  OrdersService, OrderItemsService, CartsService } from '../services';

const usersRepository = new UsersRepository();
const productsRepository = new ProductsRepository();
const addressesRepository = new AddressesRepository();
const confirmationCodesRepository = new ConfirmationCodesRepository();
const ordersRepository = new OrdersRepository();
const orderItemsRepository = new OrderItemsRepository();
const cartsRepository = new CartsRepository();

const usersService = new UsersService(usersRepository, addressesRepository, confirmationCodesRepository);
const productsService = new ProductsService(productsRepository);
const confirmationCodesService = new ConfirmationCodesService(confirmationCodesRepository);
const ordersService = new OrdersService(ordersRepository, orderItemsRepository);
const orderItemsService = new OrderItemsService(orderItemsRepository);
const cartsService = new CartsService(cartsRepository);

const usersController = new UsersController(usersService, ordersService, cartsService);
const productsController = new ProductsController(productsService);
const confirmationCodesController = new ConfirmationCodesController(confirmationCodesService);
const ordersController = new OrdersController(ordersService, orderItemsService);



export { usersService, usersController, productsService, productsController, confirmationCodesController, ordersService, ordersController, orderItemsService, cartsService }
