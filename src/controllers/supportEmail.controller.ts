import { Response, Request } from 'express';
import { SupportService } from '../services';

export class SupportEmailController {

    constructor(private supportService: SupportService) { }

    async post(request: Request, response: Response): Promise<Response> {

        const email = process.env.EMAIL_SUPPORT;
        const {
            clientEmail,
            category,
            message } = request.body


        try {

            const result = await this.supportService.post({
                email: email,
                clientEmail: clientEmail,
                category: category,
                message: message
            });

            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }
}
