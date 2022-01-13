import { PostAddressDTO, PutAddressDTO } from '../models';

export interface IAddressesRepository {

    postAddress(postAddressDTO: PostAddressDTO): Promise<boolean>;
    update(putAddressDTO: PutAddressDTO): Promise<void>;
    delete(addressId: number, userId: number): Promise<void>; 

}