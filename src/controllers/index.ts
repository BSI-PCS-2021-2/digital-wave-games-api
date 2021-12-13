import { UsersController,  } from './users.controller';
import { ProductsController } from './products.controller';
import { ConfirmationCodesController } from './confirmationCodes.controller';
import { AuthenticationController } from './authentication.controller';
import { UsersRepository, AddressesRepository, ProductsRepository, ConfirmationCodesRepository } from '../repositories';
import { UsersService, ProductsService, ConfirmationCodesService, AuthenticationService } from '../services';

const usersRepository = new UsersRepository();
const productsRepository = new ProductsRepository();
const addressesRepository = new AddressesRepository();
const confirmationCodesRepository = new ConfirmationCodesRepository();

const usersService = new UsersService(usersRepository, addressesRepository, confirmationCodesRepository);
const productsService = new ProductsService(productsRepository);
const confirmationCodesService = new ConfirmationCodesService(confirmationCodesRepository);
const authenticationService = new AuthenticationService(usersRepository);

const usersController = new UsersController(usersService);
const productsController = new ProductsController(productsService);
const confirmationCodesController = new ConfirmationCodesController(confirmationCodesService);
const authenticationController = new AuthenticationController(authenticationService);



export { usersService, usersController, productsService, productsController, confirmationCodesController, authenticationController }
