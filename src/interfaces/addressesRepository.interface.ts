import { PostAddressDTO } from '../models';

export interface IAddressesRepository {

    postAddress(postAddressDTO: PostAddressDTO): Promise<boolean>;

}