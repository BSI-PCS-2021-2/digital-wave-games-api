import { SupportEmailDTO } from '../models/';
import logger from '../utils/logger';
import { sendEmail } from '../utils/emailSender';

export class SupportService {

    constructor(){}

    async post(supportEmailDTO: SupportEmailDTO): Promise<boolean> {

        try {
            sendEmail(
                `${supportEmailDTO.email}`,
                `${supportEmailDTO.category} - DigitalWaveGames`,
                `${supportEmailDTO.message}, essa mensagem foi enviada por ${supportEmailDTO.clientEmail}`
            );
            return true;

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

    }
}
