import { Response, Request } from 'express';
import { OrdersService } from '../services';

export class OrdersController {

    constructor(private ordersService: OrdersService) {}

    async getOrder(request: Request, response: Response): Promise<Response> {

        try {

            const result = await this.ordersService.getOrder(request.params.order_id);
            return response.send(result);

        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }

    async post(request: Request, response: Response): Promise<Response> {
        console.log('entrei controller')
        const {
            totalPrice,
            totalWeight,
            expectedDeliveryDate,
            purchaseDate,
            paymentType,
            userClientId
         } = request.body;

        try {

            const result = await this.ordersService.post({
                totalPrice: totalPrice,
                totalWeight: totalWeight,
                expectedDeliveryDate: expectedDeliveryDate,
                purchaseDate: purchaseDate,
                paymentType: paymentType,
                userClientId: userClientId
            });

            return response.send(result);

        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }
}
