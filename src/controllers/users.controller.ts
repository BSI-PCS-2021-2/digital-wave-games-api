import { Response, Request } from 'express';
import { UsersService, OrdersService, CartsService } from '../services';

export class UsersController {

    constructor(private usersService: UsersService,
                private ordersService: OrdersService,
                private cartsService: CartsService) {}

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

    async getByUsername(request: Request, response: Response): Promise<Response> {

        try {

            const result = await this.usersService.getByUsername(request.params.username);

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
            code,
            cep
         } = request.body;

        try {

            const result = await this.usersService.post({
                email: email,
                cep: cep,
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

    async patchByUsername(request: Request, response: Response): Promise<Response> {
        const {
            username,
            password,
            code
         } = request.body;

        try {

            const result = await this.usersService.patch({
                id: undefined,
                username: username,
                password: password,
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

    async getCart(request: Request, response: Response): Promise<Response> {

        try {
            const result = await this.cartsService.getCartByClient(parseInt(request.params.client_id));
            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }

    async getAddresses(request: Request, response: Response): Promise<Response> {

        try {

            const result = await this.usersService.getAddresses(parseInt(request.params.id));

            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }

    async deleteAddress(request: Request, response: Response): Promise<Response> {

        try {  

            console.log(request.params.clientId);
            const result = await this.usersService.deleteAddress(parseInt(request.params.clientId), parseInt(request.params.addressId));

            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }

    async changePassword(request: Request, response: Response): Promise<Response> {

        try {

            const {
                newPass,
                oldPass,
                username,
             } = request.body;

            const result = await this.usersService.changePassword(username, oldPass, newPass);

            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }

    async putInfos(request: Request, response: Response): Promise<Response> {
        const {
            id,
            email,
            username,
            name,
            tel,
            phone1,
            phone2,
            secondaryEmail, 
         } = request.body;
         console.log(name)
         console.log(username);

        try {

            const result = await this.usersService.putInfo({
                id: id,
                name: name,
                username: username,
                email: email,
                phone1: tel,
                phone2: phone1,
                phone3: phone2,
                secondaryEmail: secondaryEmail
            });

            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }

    async putAddress(request: Request, response: Response): Promise<Response> {
        const {
            id,
            postalCode,
            city,
            district,
            street,
            number,
            additionalInfo,
            state,
            cep
         } = request.body;

        try {

            const result = await this.usersService.putAddress({
                id: id,
                postalCode: postalCode,
                city: city,
                district: district,
                street: street,
                number: number,
                additionalInfo: additionalInfo,
                state: state,
                cep: cep
            });

            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }
    async postAddress(request: Request, response: Response): Promise<Response> {
        const {
            postalCode,
            city,
            district,
            street,
            number,
            additionalInfo,
            state,
            cep,
            clientId
         } = request.body;

        try {

            const result = await this.usersService.postAddress({                
                postalCode: postalCode,
                city: city,
                district: district,
                street: street,
                number: number,
                additionalInfo: additionalInfo,
                state: state,
                cep: cep,
                clientId: clientId
            });

            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }
}
