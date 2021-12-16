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

}
