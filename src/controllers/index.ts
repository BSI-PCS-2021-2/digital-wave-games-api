import { UsersController,  } from './users.controller';
import { ProductsController } from './products.controller';
import { PasswordRecoveryCodesController } from './passwordRecoveryCodes.controller';
import { ConfirmationCodesController } from './confirmationCodes.controller';
import { AuthenticationController } from './authentication.controller';
import { OrdersController } from './orders.controller';

import { UsersRepository, AddressesRepository, ProductsRepository, OrdersRepository, OrderItemsRepository, CartsRepository, ConfirmationCodesRepository, PasswordRecoveryCodesRepository } from '../repositories';
import { UsersService, ProductsService, ConfirmationCodesService, AuthenticationService, OrdersService, OrderItemsService, CartsService, PasswordRecoveryCodesService } from '../services';

const usersRepository = new UsersRepository();
const productsRepository = new ProductsRepository();
const addressesRepository = new AddressesRepository();
const confirmationCodesRepository = new ConfirmationCodesRepository();
const passwordRecoveryCodesRepository = new PasswordRecoveryCodesRepository();
const ordersRepository = new OrdersRepository();
const orderItemsRepository = new OrderItemsRepository();
const cartsRepository = new CartsRepository();

const usersService = new UsersService(usersRepository, addressesRepository, confirmationCodesRepository, passwordRecoveryCodesRepository);
const productsService = new ProductsService(productsRepository);
const confirmationCodesService = new ConfirmationCodesService(confirmationCodesRepository);
const passwordRecoveryCodesService = new PasswordRecoveryCodesService(passwordRecoveryCodesRepository, usersRepository);
const authenticationService = new AuthenticationService(usersRepository);
const ordersService = new OrdersService(ordersRepository, orderItemsRepository);
const orderItemsService = new OrderItemsService(orderItemsRepository);
const cartsService = new CartsService(cartsRepository);

const usersController = new UsersController(usersService, ordersService, cartsService);
const productsController = new ProductsController(productsService);
const confirmationCodesController = new ConfirmationCodesController(confirmationCodesService);
const passwordRecoveryCodesController = new PasswordRecoveryCodesController(passwordRecoveryCodesService);
const authenticationController = new AuthenticationController(authenticationService);
const ordersController = new OrdersController(ordersService, orderItemsService);

export { usersService, usersController, productsService, productsController, confirmationCodesController, passwordRecoveryCodesController, authenticationController, ordersService, ordersController, orderItemsService, cartsService }
