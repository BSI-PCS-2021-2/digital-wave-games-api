// import { knex } from '../../../database/index';
import { IConfirmationCodesRepository } from '../interfaces';
import { PostConfirmationCodesDTO } from '../models';
import { mysqlDatabase } from '../databases';
import logger from '../utils/logger';

export class ConfirmationCodesRepository implements IConfirmationCodesRepository {

    async postConfirmationCode(postConfirmationCodeDTO: PostConfirmationCodesDTO): Promise<boolean> {

        try {
            
            await mysqlDatabase
            .default('codigo_confirmacao')
            .insert([{
                codigo: postConfirmationCodeDTO.code || null,
                validade: postConfirmationCodeDTO.expirationDate || null,
                email: postConfirmationCodeDTO.email || null,
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

    async getCode(email: string): Promise<string | null> {

        let code: string | null = null;

        const sql = `SELECT * FROM codigo_confirmacao WHERE email = ? AND NOW() < validade  ORDER BY id DESC LIMIT 1; `;

        try {
            await mysqlDatabase.default.raw(sql, [email || null]).then(data => {

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
