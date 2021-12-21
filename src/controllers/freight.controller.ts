import { Response, Request } from 'express';
import { FreightService } from '../services';

export class FreightController {

    constructor(private freightService: FreightService) {}

    async calculateFreight(request: Request, response: Response): Promise<Response> {
        
        try {
            const result = this.freightService.calculateFreight(request.body.weight);
            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }
}