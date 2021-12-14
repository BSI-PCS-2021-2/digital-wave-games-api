import { PatchUserDTO, User } from '../models';
import { PostUserDTO } from '../models';

export interface IUsersRepository {

    getUsers(): Promise<User[]>;
    getUser(username: string): Promise<User | null>;
    postUser(postUserDTO: PostUserDTO): Promise<number[]>;
    patchUser(patchUserDTO: PatchUserDTO): Promise<number[]>

}
