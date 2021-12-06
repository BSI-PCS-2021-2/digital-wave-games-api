import { User } from "../entities/user";

export interface IUsersRepository {

    getUsers(): Promise<User[]>;

}