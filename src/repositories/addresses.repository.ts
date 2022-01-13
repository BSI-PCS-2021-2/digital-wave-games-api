import { IAddressesRepository } from '../interfaces';
import { PostAddressDTO, User } from '../models';
import { mysqlDatabase } from '../databases';
import logger from '../utils/logger';
import { PutAddressDTO } from '../models';

export class AddressesRepository implements IAddressesRepository {

    async postAddress(postAddressDTO: PostAddressDTO): Promise<boolean> {

        const sql = `INSERT INTO endereco (cep, cidade, bairro, rua, numero, complemento, estado, id_cliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

        try {
            await mysqlDatabase.default.raw(sql, [
                postAddressDTO.postalCode || null,
                postAddressDTO.city || null,
                postAddressDTO.district || null,
                postAddressDTO.street || null,
                postAddressDTO.number || null,
                postAddressDTO.additionalInfo || null,
                postAddressDTO.state || null,
                postAddressDTO.clientId || null,
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

    async delete(addressId: number, userId: number) {
        try {

            mysqlDatabase
            .default('endereco')
            .delete()
            .where({id: addressId, id_cliente: userId})
            .catch((error: any) => {
              logger.error(error);
              throw new Error(error);
          });
          
        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
        return;
    }

    async update(putAddressDTO: PutAddressDTO): Promise<void> {

        try {

            await mysqlDatabase
            .default("endereco")
            .update({
                cidade: putAddressDTO.city,
                bairro: putAddressDTO.district,
                rua: putAddressDTO.street,
                numero: putAddressDTO.number,
                complemento: putAddressDTO.additionalInfo,
                estado: putAddressDTO.state,
                cep: putAddressDTO.cep
            })
            .where({id: putAddressDTO.id})

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
    }
}