import { PostConfirmationCodesDTO } from '../models';
import { IConfirmationCodesRepository } from '../interfaces';
import logger from '../utils/logger';
import { randomAlphanumericCode } from '../utils/random';
import { sendEmail } from '../utils/emailSender';


export class ConfirmationCodesService {

    constructor(
        private confirmationCodesRepository: IConfirmationCodesRepository
        ) { }

    async post(postConfirmationCodesDTO: PostConfirmationCodesDTO): Promise<boolean> {

        try {

            let today = new Date();
            today.setDate(today.getDate() + 1)

            postConfirmationCodesDTO.expirationDate = today;
            postConfirmationCodesDTO.code = randomAlphanumericCode(6);

            sendEmail(
                postConfirmationCodesDTO.email,
                'Confirmação de email - DigitalWaveGames',
                `Use o código a seguir para criar a sua conta: ${postConfirmationCodesDTO.code}`
            );

            const response = await this.confirmationCodesRepository.postConfirmationCode(postConfirmationCodesDTO);

            return response;

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

    }

}