import { SqlUsersRepository } from '../../repositories/SqlUsersRepository';
import { GetUsersUseCase } from './getUsersUseCase';
import { GetUsersController } from './getUsersController';

const sqlUsersRepository = new SqlUsersRepository();

const getUsersUseCase = new GetUsersUseCase(
    sqlUsersRepository
);

const getUsersController = new GetUsersController(
    getUsersUseCase
);

export { getUsersUseCase, getUsersController }
