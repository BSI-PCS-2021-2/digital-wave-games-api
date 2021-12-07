import { UsersController } from './users.controller';
import { UsersRepository } from '../repositories';
import { UsersService } from '../services';

const usersRepository = new UsersRepository();

const usersService = new UsersService(
    usersRepository
);

const usersController = new UsersController(
    usersService
);

export { usersService, usersController }