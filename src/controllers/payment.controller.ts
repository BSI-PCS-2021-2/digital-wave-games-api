import { Response, Request } from 'express';
import { PaymentService } from '../services';

export class PaymentController {

    constructor(private paymentService: PaymentService) {}

    async makeBankSlipPayment(request: Request, response: Response): Promise<Response> {
        
        // Precisamos definir quais informações serão necessárias para emitir um boleto falso.

        try {

            const result = await this.paymentService.makeBankSlipPayment();
            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }

    async makeCardPayment(request: Request, response: Response): Promise<Response> {
        
        // Precisamos definir quais informações serão necessárias para pagamento de cartão falso.

        try {

            const result = await this.paymentService.makeCardPayment();
            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }
}