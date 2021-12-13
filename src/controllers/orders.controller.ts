import { Response, Request } from 'express';
import { OrdersService, OrderItemsService } from '../services';

export class OrdersController {

    constructor(private ordersService: OrdersService, private orderItemsService) {}

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
        const {
            totalPrice,
            totalWeight,
            expectedDeliveryDate,
            purchaseDate,
            paymentType,
            userClientId,
            orderItems
         } = request.body;

        try {

            const result = await this.ordersService.post({
                totalPrice: totalPrice,
                totalWeight: totalWeight,
                expectedDeliveryDate: expectedDeliveryDate,
                purchaseDate: purchaseDate,
                paymentType: paymentType,
                userClientId: userClientId,
                orderItems: orderItems
            });

            return response.send(result);

        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }

    async getOrderItems(request: Request, response: Response): Promise<Response> {

        try {

            const result = await this.orderItemsService.getOrderItemsByOrder(request.params.order_id);
            return response.send(result);

        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }
}
