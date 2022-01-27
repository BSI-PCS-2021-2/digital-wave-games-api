import { Response, Request } from 'express';
import { ProductsService } from '../services';

export class ProductsController {

    constructor(private productsService: ProductsService) {}

    async get(request: Request, response: Response): Promise<Response> {

        try {

            const result = await this.productsService.get();

            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }

    async getById(request: Request, response: Response): Promise<Response> {
        try {
            const result = await this.productsService.getById(Number(request.params.id));
            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }

    async post(request: Request, response: Response): Promise<Response> {
        const {
            name,
            price,
            description,
            amount,
            releaseDate,
            imgUrl,
            genderId,
            platformId,
            publisherId,
            ratingSystemId
        } = request.body;
        try {
            const result = await this.productsService.post({
                name: name,
                price: price,
                description: description,
                amount: amount,
                releaseDate: releaseDate,
                imgUrl: imgUrl,
                genderId: genderId,
                platformId: platformId,
                publisherId: publisherId,
                ratingSystemId: ratingSystemId
            });
            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }

    async put(request: Request, response: Response): Promise<Response> {
        const {
            id,
            name,
            price,
            description,
            amount,
            releaseDate,
            imgUrl,
            genderId,
            platformId,
            publisherId,
            ratingSystemId
        } = request.body;
        try {
            const result = await this.productsService.update({
                id: id,
                name: name,
                price: price,
                description: description,
                amount: amount,
                releaseDate: releaseDate,
                imgUrl: imgUrl,
                genderId: genderId,
                platformId: platformId,
                publisherId: publisherId,
                ratingSystemId: ratingSystemId
            });
            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }


    }

    async delete(request: Request, response: Response): Promise<Response> {
        try {
            const result = await this.productsService.delete(Number(request.params.id));
            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }
}
