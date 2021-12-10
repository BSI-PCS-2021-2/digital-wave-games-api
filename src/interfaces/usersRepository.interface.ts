import { User } from '../models';
import { PostUserDTO } from '../models';

export interface IUsersRepository {

    getUsers(): Promise<User[]>;
    getUser(username: string): Promise<User>;
    postUser(postUserDTO: PostUserDTO): Promise<number[]>;

}