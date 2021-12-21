import { Response, Request } from 'express';
import { OrdersService, OrderItemsService } from '../services';

export class OrdersController {

    constructor(private ordersService: OrdersService, private orderItemsService: OrderItemsService) {}

    async getOrder(request: Request, response: Response): Promise<Response> {

        try {

            const result = await this.ordersService.getOrder(parseInt(request.params.order_id));
            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }

    async postOrder(request: Request, response: Response): Promise<Response> {
        const {
            cartId,
            totalPrice,
            deliveryId,
            paymentTypeId
         } = request.body;

        try {

            const result = await this.ordersService.postOrder({
                cartId: cartId,
                totalPrice: totalPrice,
                deliveryId: deliveryId,
                paymentTypeId: paymentTypeId
            });

            return response.status(201).json({id: result});

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }


    async getOrderItems(request: Request, response: Response): Promise<Response> {

        try {

            const result = await this.orderItemsService.getOrderItemsByOrder(parseInt(request.params.order_id));
            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }
}
