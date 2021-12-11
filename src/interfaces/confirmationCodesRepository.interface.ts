import { PostConfirmationCodesDTO } from '../models';

export interface IConfirmationCodesRepository {

    postConfirmationCode(postConfirmationCodeDTO: PostConfirmationCodesDTO): Promise<boolean>;

}