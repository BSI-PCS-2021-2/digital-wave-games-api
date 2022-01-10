import { Response, Request } from 'express';
import { SupportService } from '../services';

export class SupportEmailController {

    constructor(private supportService: SupportService) { }

    async post(request: Request, response: Response): Promise<Response> {
        
        const email = "example@gmail.com";
        const clientEmail = "request.body.clientEmail";
        const category = "request.body.category";
        const message = "request.body.message";
        

        try {

            const result = await this.supportService.post({
                email: email,
                clientEmail: clientEmail,
                category: category,
                message: message
            });

            return response.send(clientEmail + " teste");

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }
}
