import { IAddressesRepository } from '../interfaces';
import { PostAddressDTO } from '../models';
import { mysqlDatabase } from '../databases';
import logger from '../utils/logger';

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

}