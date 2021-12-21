import { Router } from 'express';
import { paymentController } from '../../controllers';


const router = Router();

router.post('/payment/bank-slip', (request, response) => {
    return paymentController.makeBankSlipPayment(request, response);
});

router.post('/payment/card', (request, response) => {
    return paymentController.makeCardPayment(request, response);
});

export default router;