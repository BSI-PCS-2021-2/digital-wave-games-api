import { IPasswordRecoveryCodesRepository } from '../interfaces';
import { PostPasswordRecoveryCodesDTO } from '../models';
import { mysqlDatabase } from '../databases';
import logger from '../utils/logger';

export class PasswordRecoveryCodesRepository implements IPasswordRecoveryCodesRepository {

    async postPasswordRecoveryCode(postPasswordRecoveryCodeDTO: PostPasswordRecoveryCodesDTO): Promise<boolean> {

        try {
            
            await mysqlDatabase
            .default('codigo_troca_senha')
            .insert([{
                codigo: postPasswordRecoveryCodeDTO.code || null,
                validade: postPasswordRecoveryCodeDTO.expirationDate || null,
                id_usuario: postPasswordRecoveryCodeDTO.userId || null,
            }
            ]).catch((error: any) => {
                logger.error(error);
                throw new Error(error);
            });

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

        return true;

    }

    async getCode(id: number | undefined): Promise<string | null> {

        let code: string | null = null;

        const sql = `SELECT * FROM codigo_troca_senha WHERE id_usuario = ? AND NOW() < validade  ORDER BY id DESC LIMIT 1; `;

        try {
            await mysqlDatabase.default.raw(sql, [id || null]).then(data => {

                if (data[0].length > 0) {
                    data[0].forEach((userResult: any) => {

                        code = userResult['codigo'];

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

        return code;

    }

}
