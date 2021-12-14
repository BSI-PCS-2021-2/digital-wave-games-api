import { PostAddressDTO, User, PostCartDTO } from '../models';
import { PostUserDTO } from '../models';
import { IUsersRepository, IAddressesRepository, ICartsRepository } from '../interfaces';
import { ENCRYPTION_SECRET } from '../utils/secrets';
import logger from '../utils/logger';
import { ConfirmationCodesRepository } from '../repositories/confirmationCodes.repository';
import sha256 from 'crypto-js/sha256';

export class UsersService {

    constructor(
        private usersRepository: IUsersRepository,
        private addressesRepository: IAddressesRepository,
        private confirmationCodesRepository: ConfirmationCodesRepository,
        private cartsRepository: ICartsRepository
        ) { }

    async get(): Promise<User[]> {

        try {

            const response = await this.usersRepository.getUsers();

            return response;

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

    }

    async getByUsername(username: string): Promise<User | null> {
        try {

            const response = await this.usersRepository.getUser(username);

            return response;

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

    }

    async post(postUserDTO: PostUserDTO): Promise<number[]> {

        try {

            const user = await this.usersRepository.getUser(postUserDTO.username);
            const code = await this.confirmationCodesRepository.getCode(postUserDTO.email);

            if (user !== null) {
                return [-1];
            }

            if (code !== postUserDTO.code) {
                return [-2];
            }

            postUserDTO.password = sha256(postUserDTO.password + ENCRYPTION_SECRET).toString();

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

            let cart: PostCartDTO = {
                clientId: response[0]
            }

            await this.addressesRepository.postAddress(address);
            await this.cartsRepository.postCart(cart);
            
            return response;

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

    }

}
