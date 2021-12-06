// import { knex } from '../../../database/index';
import { IUsersRepository } from "../interfaces/IUsersRepository";
import { User } from '../entities/user';
import logger from '../utils/logger';
import { mysql } from "../databases/index";

export class SqlUsersRepository implements IUsersRepository {

    async getUsers(): Promise<User[]> {

        let users: User[] = [];

        const sql = `SELECT * FROM usuario_cliente;`;

        try {
            await mysql.default.raw(sql).then(data => {

                if (data[0].length > 0) {
                    data[0].forEach(user => {
                        users.push(user);
                    });
                }

            }).catch(err => {
                logger.error(err);
                throw new Error(err);
            });

        } catch (error) {
            throw new Error(error);
        }

        return users;

    }

}