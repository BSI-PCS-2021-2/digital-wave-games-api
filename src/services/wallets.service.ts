import { User, Wallet } from '../models';
import { IUsersRepository } from '../interfaces';
import logger from '../utils/logger';
import { WalletsRepository } from '../repositories/wallets.repository';

export class WalletsService {

    constructor(
        private usersRepository: IUsersRepository,
        private walletsRepository: WalletsRepository
        ) { }

    async getByUsername(username: string): Promise<Wallet | null> {
        try {

            const user: User | null = await this.usersRepository.getUser(username);

            if (user === null || user === undefined) {
                return null;
            }

            const response = await this.walletsRepository.getWallet(user.id);

            return response;

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

    }

    async put(walletId: number, value: number): Promise<boolean> {
        try {
            const response = await this.walletsRepository.putWallet(walletId, value);

            return response;

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

    }

}
