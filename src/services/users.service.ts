import { PostAddressDTO, User } from '../models';
import { PostUserDTO } from '../models';
import { IUsersRepository, IAddressesRepository } from '../interfaces';
import { ENCRYPTION_SECRET } from '../utils/secrets';
import logger from '../utils/logger';

const cryptoJS = require("crypto-js");

export class UsersService {

    constructor(
        private usersRepository: IUsersRepository,
        private addressesRepository: IAddressesRepository
        ) { }

    async get(): Promise<User[]> {

        try {
            
            const response = await this.usersRepository.getUsers();
            
            return response;

        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }

    }

    async post(postUserDTO: PostUserDTO): Promise<number[]> {

        try {

            const user = await this.usersRepository.getUser(postUserDTO.username);

            if (user !== null) {
                return [];
            }

            postUserDTO.password = cryptoJS.AES.encrypt(postUserDTO.password, ENCRYPTION_SECRET).toString();
            
            const response: number[] = await this.usersRepository.postUser(postUserDTO);

            let address: PostAddressDTO = {
                postalCode: postUserDTO.postalCode,
                city: postUserDTO.city,
                district: postUserDTO.district,
                street: postUserDTO.street,
                number: postUserDTO.number,
                additionalInfo: postUserDTO.additionalInfo,
                state: postUserDTO.state,
                clientId: response[0]
            }

            await this.addressesRepository.postAddress(address);
            
            return response;

        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }

    }

}