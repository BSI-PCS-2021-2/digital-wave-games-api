import { Response, Request } from 'express';
import { UsersService } from '../services';

export class UsersController {

    constructor(private usersService: UsersService) {}

    async get(request: Request, response: Response): Promise<Response> {

        try {

            const result = await this.usersService.get();

            return response.send(result);
            
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }

    async post(request: Request, response: Response): Promise<Response> {

        const { name, email } = request.body;

        try {

            const result = await this.usersService.post({
                name: name,
                email: email
            });

            return response.send(result);
            
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }
}
