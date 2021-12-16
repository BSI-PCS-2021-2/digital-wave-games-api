import { Wallet } from '../models';

export interface IWalletsRepository {

    getWallet(userId: number): Promise<Wallet | null>;

}