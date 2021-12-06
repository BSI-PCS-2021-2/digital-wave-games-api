import { IUsersRepository } from "../../interfaces/IUsersRepository";
import { User } from "../../entities/user";
import { IGetUsersDTO } from "./IGetUsersDTO";

export class GetUsersUseCase {

    constructor(private usersRepository: IUsersRepository) { }

    async execute(data: IGetUsersDTO): Promise<User[]> {

        try {
            
            const response = await this.usersRepository.getUsers();
            
            return response;

        } catch (error) {
            throw new Error(error);
        }

    }

}