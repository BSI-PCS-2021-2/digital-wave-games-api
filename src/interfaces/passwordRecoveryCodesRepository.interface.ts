import { PostPasswordRecoveryCodesDTO } from '../models';

export interface IPasswordRecoveryCodesRepository {

    postPasswordRecoveryCode(postPasswordRecoveryCodeDTO: PostPasswordRecoveryCodesDTO): Promise<boolean>;

}