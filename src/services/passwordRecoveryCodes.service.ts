import { PostPasswordRecoveryCodesDTO, User } from '../models';
import { IPasswordRecoveryCodesRepository } from '../interfaces';
import logger from '../utils/logger';
import { randomAlphanumericCode } from '../utils/random';
import { sendEmail } from '../utils/emailSender';
import { UsersRepository } from '../repositories/users.repository';


export class PasswordRecoveryCodesService {

    constructor(
        private passwordRecoveryCodesRepository: IPasswordRecoveryCodesRepository,
        private usersRepository: UsersRepository
        ) { }

    async post(postPasswordRecoveryCodesDTO: PostPasswordRecoveryCodesDTO): Promise<boolean> {

        try {

            let today = new Date();
            today.setDate(today.getDate() + 1)

            postPasswordRecoveryCodesDTO.expirationDate = today;
            postPasswordRecoveryCodesDTO.code = randomAlphanumericCode(6);

            const user: User | null = await this.usersRepository.getUser(postPasswordRecoveryCodesDTO.username);

            if (user === null || user === undefined) {
                return false;
            }

            postPasswordRecoveryCodesDTO.userId = user.id;

            sendEmail(
                user.email,
                'Alteração de senha - DigitalWaveGames',
                `Use o código a seguir para alterar a senha da sua conta ${postPasswordRecoveryCodesDTO.username}: ${postPasswordRecoveryCodesDTO.code}`
            );

            const response = await this.passwordRecoveryCodesRepository.postPasswordRecoveryCode(postPasswordRecoveryCodesDTO);

            return response;

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

    }

}