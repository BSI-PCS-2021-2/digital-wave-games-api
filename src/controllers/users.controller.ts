import { Response, Request } from 'express';
import { UsersService, OrdersService } from '../services';

export class UsersController {

    constructor(private usersService: UsersService,
                private ordersService: OrdersService) {}

    async get(request: Request, response: Response): Promise<Response> {

        try {

            const result = await this.usersService.get();

            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }


    async post(request: Request, response: Response): Promise<Response> {

        const {
            email,
            username,
            name,
            password,
            postalCode,
            city,
            state,
            district,
            number,
            additionalInfo,
            street,
            phone1,
            phone2,
            phone3,
            secondaryEmail,
            code
         } = request.body;

        try {

            const result = await this.usersService.post({
                email: email,
                username: username,
                name: name,
                password: password,
                postalCode: postalCode,
                city: city,
                state: state,
                district: district,
                number: number,
                additionalInfo: additionalInfo,
                street: street,
                phone1: phone1,
                phone2: phone2,
                phone3: phone3,
                secondaryEmail: secondaryEmail,
                code: code
            });

            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }


    async getOrders(request: Request, response: Response): Promise<Response> {

        try {
            const result = await this.ordersService.getOrdersByClient(parseInt(request.params.client_id));
            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }
}
