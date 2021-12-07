// import { knex } from '../../../database/index';
import { IUsersRepository } from '../interfaces';
import { PostUserDTO, User } from '../models';
import { mysqlDatabase } from '../databases';
import logger from '../utils/logger';

export class UsersRepository implements IUsersRepository {

    async getUsers(): Promise<User[]> {

        let users: User[] = [];

        const sql = `SELECT * FROM usuario_cliente;`;

        try {
            await mysqlDatabase.default.raw(sql).then(data => {

                if (data[0].length > 0) {
                    data[0].forEach(user => {

                        users.push({
                            id: user['id'],
                            name: user['nome'],
                            email: user['email']
                        });

                    });
                }

            }).catch(err => {
                logger.error(err);
                throw new Error(err);
            });

        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }

        return users;

    }

    async postUser(postUserDTO: PostUserDTO): Promise<boolean> {

        const sql = `INSERT INTO usuario_cliente (nome, email) VALUES (?, ?);`;

        try {
            await mysqlDatabase.default.raw(sql, [
                postUserDTO.name || null,
                postUserDTO.email || null
            ])
            .catch(err => {
                logger.error(err);
                throw new Error(err);
            });

        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }

        return true;

    }

}