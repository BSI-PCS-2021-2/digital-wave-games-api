import { Response, Request } from 'express';
import { ConfirmationCodesService } from '../services';

export class ConfirmationCodesController {

    constructor(private confirmationCodesService: ConfirmationCodesService) {}

    async post(request: Request, response: Response): Promise<Response> {

        const { 
            email
         } = request.body;

        try {

            const result = await this.confirmationCodesService.post({
                email: email,
                code: undefined,
                expirationDate: undefined
            });

            return response.send(result);
            
        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }
}
