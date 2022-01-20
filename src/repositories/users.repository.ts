import { IUsersRepository } from '../interfaces';
import { PatchUserDTO, PostUserDTO, PutUserDTO, User } from '../models';
import { mysqlDatabase } from '../databases';
import logger from '../utils/logger';

export class UsersRepository implements IUsersRepository {

    async getUsers(): Promise<User[]> {

        let users: User[] = [];

        const sql = `SELECT * FROM usuario_cliente;`;

        try {
            await mysqlDatabase.default.raw(sql).then(data => {

                if (data[0].length > 0) {
                    data[0].forEach((user: any) => {

                        users.push({
                            id: user['id'],
                            username: user['nome_usuario'],
                            name: user['nome'],
                            email: user['email'],
                            isEmailConfirmed: user['email_confirmado'],
                            profileImage: user['foto_perfil'],
                            tel: user['tel_1'],
                            cel1: user['tel_2'],
                            cel2: user['tel_3'],
                            secondaryEmail: user['email_secundario'],
                            failedLoginAttempts: user['acesso_falho'],
                            nextAllowedAccess: user['liberar_acesso'],
                            banned: user['bloqueado']
                        });

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

        return users;

    }

    async getUser(username: string): Promise<User | null> {


        let user: User | null = null;

        const sql = `SELECT * FROM usuario_cliente WHERE nome_usuario = ?;`;

        try {
            await mysqlDatabase.default.raw(sql, [username || null]).then(data => {

                if (data[0].length > 0) {
                    data[0].forEach((userResult: any) => {

                        user = {
                            id: userResult['id'],
                            username: userResult['nome_usuario'],
                            name: userResult['nome'],
                            email: userResult['email'],
                            isEmailConfirmed: userResult['email_confirmado'],
                            profileImage: userResult['foto_perfil'],
                            tel: userResult['tel_1'],
                            cel1: userResult['tel_2'],
                            cel2: userResult['tel_3'],
                            secondaryEmail: userResult['email_secundario'],
                            failedLoginAttempts: userResult['acesso_falho'],
                            nextAllowedAccess: userResult['liberar_acesso'],
                            banned: userResult['bloqueado']
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

        return user;

    }

    async getUserPassword(username: string): Promise<string> {

        let password: string = '';

        const sql = `SELECT * FROM usuario_cliente WHERE nome_usuario = ?;`;

        try {
            await mysqlDatabase.default.raw(sql, [username || null]).then(data => {

                if (data[0].length > 0) {
                    data[0].forEach((userResult: any) => {

                        password = userResult['senha'];

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

        return password;

    }

    async postUser(postUserDTO: PostUserDTO): Promise<number[]> {

        let index: number[] = [];

        try {

            await mysqlDatabase
            .default('usuario_cliente')
            .returning('id')
            .insert([{
                nome_usuario: postUserDTO.username || null,
                senha: postUserDTO.password || null,
                email: postUserDTO.email || null,
                bloqueado: false,
                tel_1: postUserDTO.phone1 || null,
                tel_2: postUserDTO.phone2 || null,
                tel_3: postUserDTO.phone3 || null,
                email_secundario: postUserDTO.secondaryEmail || null
            }
            ]).then( insertedIndex => {
                index = insertedIndex;
            })
            .catch((error: any) => {
                logger.error(error);
                throw new Error(error);
            });

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

        return index;

    }

    async update(putUserDTO: PutUserDTO): Promise<void> {

        try {

            await mysqlDatabase
            .default("usuario_cliente")
            .update({
                email: putUserDTO.email,
                tel_1: putUserDTO.phone1,
                tel_2: putUserDTO.phone2,
                tel_3: putUserDTO.phone3,
                nome: putUserDTO.name,
                nome_usuario: putUserDTO.username,
                email_secundario: putUserDTO.secondaryEmail
            })
            .where({id: putUserDTO.id})

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
    }

    async changePassword(username: string, password: string): Promise<void> {

        try {

            await mysqlDatabase
            .default("usuario_cliente")
            .update({
                senha: password
            })
            .where({nome_usuario: username})

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
    }

    async patchUser(patchUserDTO: PatchUserDTO): Promise<number[]> {

        let index: number[] = [];

        try {

            await mysqlDatabase
            .default('usuario_cliente')
            .returning('id')
            .where({ id: patchUserDTO.id })
            .update({
                senha: patchUserDTO.password
            })
            .then( insertedIndex => {
                index.push(insertedIndex);
            })
            .catch((error: any) => {
                logger.error(error);
                throw new Error(error);
            });

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

        return index;

    }

    async getAddresses(userId: number): Promise<any> {


        let addresses: any[] = [];

        const sql = `SELECT * FROM endereco WHERE id_cliente = ?;`;

        try {
            await mysqlDatabase.default.raw(sql, [userId || null]).then(data => {

                if (data[0].length > 0) {
                    data[0].forEach((userResult: any) => {

                        addresses.push({
                            id: userResult['id'],
                            postalCode: userResult['codigo_postal'],
                            city: userResult['cidade'],
                            district: userResult['bairro'],
                            street: userResult['rua'],
                            number: userResult['numero'],
                            additionalInfo: userResult['complemento'],
                            state: userResult['estado'],
                            cep: userResult['cep']
                        });

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

        return addresses;

    }

}
