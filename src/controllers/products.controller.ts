import { Response, Request } from 'express';
import { ProductsService } from '../services';

export class ProductsController {

    constructor(private productsService: ProductsService) {}

    async get(request: Request, response: Response): Promise<Response> {

        try {

            const result = await this.productsService.get();

            return response.send(result);
            
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }
}
