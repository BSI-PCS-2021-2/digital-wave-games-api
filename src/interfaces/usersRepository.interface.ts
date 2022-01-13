import { PatchUserDTO, User } from '../models';
import { PostUserDTO } from '../models';
import { PutUserDTO } from '../models';

export interface IUsersRepository {

    getUsers(): Promise<User[]>;
    getUser(username: string): Promise<User | null>;
    postUser(postUserDTO: PostUserDTO): Promise<number[]>;
    patchUser(patchUserDTO: PatchUserDTO): Promise<number[]>
    getAddresses(userId: number): Promise<any[]>
    update(putUserDTO: PutUserDTO): Promise<void>;
    changePassword(username: string, password: string): Promise<void>;
    getUserPassword(username: string): Promise<string>;

}
