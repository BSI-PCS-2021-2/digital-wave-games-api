import { Wallet } from '../models';
import { mysqlDatabase } from '../databases';
import logger from '../utils/logger';
import { IWalletsRepository } from '../interfaces';

export class WalletsRepository implements IWalletsRepository {

    async getWallet(userId: number | undefined): Promise<Wallet | null> {

        let wallet: Wallet | null = null;

        const sql = `SELECT * FROM carteira WHERE id_usuario = ?;`;

        try {
            await mysqlDatabase.default.raw(sql, [userId || null]).then(data => {

                if (data[0].length > 0) {
                    data[0].forEach((userResult: any) => {

                        wallet = {
                            id: userResult['id'],
                            funds: userResult['valor'],
                            userId: userResult['id_usuario']
                        };

                    });
                }

            }).catch((error: any) => {
                logger.error(error);
                throw new Error(error);
            });

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

        return wallet;

    }

    async postWallet(userId: number): Promise<boolean> {

        const sql = `INSERT INTO carteira (valor, id_usuario) VALUES (?, ?);`;

        try {
            await mysqlDatabase.default.raw(sql, [
                0,
                userId || null,
            ])
            .catch(err => {
                logger.error(err);
                throw new Error(err);
            });

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

        return true;

    }

    async putWallet(walletId: number, value: number): Promise<boolean> {
    
        const sql = `UPDATE carteira SET valor = ? WHERE id = ?;`;

        try {
            await mysqlDatabase.default.raw(sql, [
                value || null,
                walletId || null,
            ])
            .catch(err => {
                logger.error(err);
                throw new Error(err);
            });

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

        return true;

    }

    async decreaseFunds(total: number, userId: number): Promise<boolean> {

        const sql = `UPDATE carteira SET valor = valor - ? WHERE id_usuario = ?;`;

        try {
            await mysqlDatabase.default.raw(sql, [
                total,
                userId,
            ])
            .catch(err => {
                logger.error(err);
                throw new Error(err);
            });

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

        return true;

    }

}
