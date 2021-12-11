import { Router } from 'express';
import { ordersController } from '../../controllers';


const router = Router();


router.get('/order/:order_id', (request, response) => {
    return ordersController.getOrder(request, response);
});

router.post('/order', (request, response) => {
  console.log('entrei')
    return ordersController.post(request, response);
});


export default router;
