import { User } from '../models';
import { PostUserDTO } from '../models';
import { IUsersRepository } from '../interfaces';

export class UsersService {

    constructor(private usersRepository: IUsersRepository) { }

    async get(): Promise<User[]> {

        try {
            
            const response = await this.usersRepository.getUsers();
            
            return response;

        } catch (error) {
            throw new Error(error);
        }

    }

    async post(postUserDTO: PostUserDTO): Promise<boolean> {

        try {

            // TODO: verificar se o usuário já está cadastrado e demais regras de negócio
            
            const response = await this.usersRepository.postUser(postUserDTO);
            
            return response;

        } catch (error) {
            throw new Error(error);
        }

    }

}