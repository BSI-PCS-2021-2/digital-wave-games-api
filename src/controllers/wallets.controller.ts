import { Response, Request } from 'express';
import { WalletsService } from '../services';

export class WalletsController {

    constructor(private walletsService: WalletsService) {}

    async get(request: Request, response: Response): Promise<Response> {

        try {
            const result = await this.walletsService.getByUsername(request.params.username);

            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }

    async put(request: Request, response: Response): Promise<Response> {

        try {
            const result = await this.walletsService.put(request.body.walletId, request.body.value);

            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }

}
