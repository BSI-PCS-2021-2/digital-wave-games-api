import { Router } from 'express';
import { ordersController } from '../../controllers';


const router = Router();


router.get('/order/:order_id', (request, response) => {
    return ordersController.getOrder(request, response);
});

router.get('/order/:order_id/items', (request, response) => {
    return ordersController.getOrderItems(request, response);
});

router.post('/order', (request, response) => {
    return ordersController.postOrder(request, response);
});


export default router;
