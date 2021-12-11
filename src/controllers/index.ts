import { UsersController,  } from './users.controller';
import { ProductsController } from './products.controller';
import { ConfirmationCodesController } from './confirmationCodesController';
import { UsersRepository, AddressesRepository, ProductsRepository, ConfirmationCodesRepository } from '../repositories';
import { UsersService, ProductsService, ConfirmationCodesService } from '../services';

const usersRepository = new UsersRepository();
const productsRepository = new ProductsRepository();
const addressesRepository = new AddressesRepository();
const confirmationCodesRepository = new ConfirmationCodesRepository();

const usersService = new UsersService(usersRepository, addressesRepository, confirmationCodesRepository);
const productsService = new ProductsService(productsRepository);
const confirmationCodesService = new ConfirmationCodesService(confirmationCodesRepository);

const usersController = new UsersController(usersService);
const productsController = new ProductsController(productsService);
const confirmationCodesController = new ConfirmationCodesController(confirmationCodesService);



export { usersService, usersController, productsService, productsController, confirmationCodesController }
