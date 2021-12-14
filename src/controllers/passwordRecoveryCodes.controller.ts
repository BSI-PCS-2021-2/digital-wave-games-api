import { Response, Request } from 'express';
import { PasswordRecoveryCodesService } from '../services';

export class PasswordRecoveryCodesController {

    constructor(private passwordRecoveryCodesService: PasswordRecoveryCodesService) {}

    async post(request: Request, response: Response): Promise<Response> {

        const { 
            username
         } = request.body;

        try {

            const result = await this.passwordRecoveryCodesService.post({
                username: username,
                userId: undefined,
                code: undefined
            });

            return response.send(result);
            
        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }
}
