import { Wallet } from '../models';

export interface IWalletsRepository {

    getWallet(userId: number): Promise<Wallet | null>;
    putWallet(walletId: number, value: number): Promise<boolean>;

}