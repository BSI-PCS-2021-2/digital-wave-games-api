import { Response, Request } from 'express';
import { AuthenticationService } from '../services';

export class AuthenticationController {

    constructor(private authenticationService: AuthenticationService) {}

    async post(request: Request, response: Response): Promise<Response> {

        const { 
            username,
            password
         } = request.body;

        try {

            const result = await this.authenticationService.post({
                username: username,
                password: password
            });

            return response.send(result);
            
        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }
}
