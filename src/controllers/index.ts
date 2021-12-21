import { UsersController,  } from './users.controller';
import { ProductsController } from './products.controller';
import { PasswordRecoveryCodesController } from './passwordRecoveryCodes.controller';
import { ConfirmationCodesController } from './confirmationCodes.controller';
import { AuthenticationController } from './authentication.controller';
import { OrdersController } from './orders.controller';
import { CartsController } from './carts.controller';
import { WalletsController } from './wallets.controller';
import { PaymentController } from './payment.controller';
import { FreightController } from './freight.controller';

import { UsersRepository, AddressesRepository, ProductsRepository, OrdersRepository, OrderItemsRepository, CartsRepository, CartItemsRepository, ConfirmationCodesRepository, PasswordRecoveryCodesRepository, WalletsRepository } from '../repositories';
import { UsersService, ProductsService, ConfirmationCodesService, AuthenticationService, OrdersService, OrderItemsService, CartsService, CartItemsService, PasswordRecoveryCodesService, WalletsService, PaymentService, FreightService } from '../services';


const usersRepository = new UsersRepository();
const productsRepository = new ProductsRepository();
const addressesRepository = new AddressesRepository();
const confirmationCodesRepository = new ConfirmationCodesRepository();
const passwordRecoveryCodesRepository = new PasswordRecoveryCodesRepository();
const ordersRepository = new OrdersRepository();
const orderItemsRepository = new OrderItemsRepository();
const cartsRepository = new CartsRepository();
const cartItemsRepository = new CartItemsRepository();
const walletsRepository = new WalletsRepository();

const usersService = new UsersService(usersRepository, addressesRepository, confirmationCodesRepository, cartsRepository, passwordRecoveryCodesRepository, walletsRepository);
const productsService = new ProductsService(productsRepository);
const confirmationCodesService = new ConfirmationCodesService(confirmationCodesRepository);
const passwordRecoveryCodesService = new PasswordRecoveryCodesService(passwordRecoveryCodesRepository, usersRepository);
const authenticationService = new AuthenticationService(usersRepository);
const ordersService = new OrdersService(ordersRepository, orderItemsRepository, walletsRepository, cartItemsRepository, cartsRepository, productsRepository);
const orderItemsService = new OrderItemsService(orderItemsRepository);
const cartsService = new CartsService(cartsRepository);
const cartItemsService = new CartItemsService(cartItemsRepository);
const walletsService = new WalletsService(usersRepository, walletsRepository);
const paymentService = new PaymentService();
const freightService = new FreightService();

const usersController = new UsersController(usersService, ordersService, cartsService);
const productsController = new ProductsController(productsService);
const confirmationCodesController = new ConfirmationCodesController(confirmationCodesService);
const passwordRecoveryCodesController = new PasswordRecoveryCodesController(passwordRecoveryCodesService);
const authenticationController = new AuthenticationController(authenticationService);
const ordersController = new OrdersController(ordersService, orderItemsService);
const cartsController = new CartsController(cartsService, cartItemsService);
const walletsController = new WalletsController(walletsService);
const paymentController = new PaymentController(paymentService);
const freightController = new FreightController(freightService);

export { walletsController, usersService, usersController, productsService, productsController, confirmationCodesController, passwordRecoveryCodesController, authenticationController, ordersService, ordersController, orderItemsService, cartsService, cartItemsService, cartsController, paymentService, paymentController, freightService, freightController }
