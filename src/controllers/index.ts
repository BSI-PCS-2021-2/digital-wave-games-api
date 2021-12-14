import { UsersController,  } from './users.controller';
import { ProductsController } from './products.controller';
import { PasswordRecoveryCodesController } from './passwordRecoveryCodes.controller';
import { ConfirmationCodesController } from './confirmationCodes.controller';
import { AuthenticationController } from './authentication.controller';
import { OrdersController } from './orders.controller';
import { CartsController } from './carts.controller';

import { UsersRepository, AddressesRepository, ProductsRepository, OrdersRepository, OrderItemsRepository, CartsRepository, CartItemsRepository, ConfirmationCodesRepository, PasswordRecoveryCodesRepository } from '../repositories';
import { UsersService, ProductsService, ConfirmationCodesService, AuthenticationService, OrdersService, OrderItemsService, CartsService, CartItemsService, PasswordRecoveryCodesService } from '../services';

const usersRepository = new UsersRepository();
const productsRepository = new ProductsRepository();
const addressesRepository = new AddressesRepository();
const confirmationCodesRepository = new ConfirmationCodesRepository();
const passwordRecoveryCodesRepository = new PasswordRecoveryCodesRepository();
const ordersRepository = new OrdersRepository();
const orderItemsRepository = new OrderItemsRepository();
const cartsRepository = new CartsRepository();
const cartItemsRepository = new CartItemsRepository();

const usersService = new UsersService(usersRepository, addressesRepository, confirmationCodesRepository, cartsRepository, passwordRecoveryCodesRepository);
const productsService = new ProductsService(productsRepository);
const confirmationCodesService = new ConfirmationCodesService(confirmationCodesRepository);
const passwordRecoveryCodesService = new PasswordRecoveryCodesService(passwordRecoveryCodesRepository, usersRepository);
const authenticationService = new AuthenticationService(usersRepository);
const ordersService = new OrdersService(ordersRepository, orderItemsRepository);
const orderItemsService = new OrderItemsService(orderItemsRepository);
const cartsService = new CartsService(cartsRepository);
const cartItemsService = new CartItemsService(cartItemsRepository);

const usersController = new UsersController(usersService, ordersService);
const productsController = new ProductsController(productsService);
const confirmationCodesController = new ConfirmationCodesController(confirmationCodesService);
const passwordRecoveryCodesController = new PasswordRecoveryCodesController(passwordRecoveryCodesService);
const authenticationController = new AuthenticationController(authenticationService);
const ordersController = new OrdersController(ordersService, orderItemsService);
const cartsController = new CartsController(cartsService, cartItemsService);

export { usersService, usersController, productsService, productsController, confirmationCodesController, passwordRecoveryCodesController, authenticationController, ordersService, ordersController, orderItemsService, cartsService, cartItemsService, cartsController }
