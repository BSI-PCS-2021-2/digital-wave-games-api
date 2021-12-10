import { Router } from 'express';
import { usersController } from '../../controllers';


const router = Router();

router.get('/users', (request, response) => {
    return usersController.get(request, response);
});

router.get('/user/:client_id', (request, response) => {
    return usersController.getByUsername(request, response);
});

router.get('/user/:client_id/orders', (request, response) => {
    return usersController.getOrders(request, response);
});

router.get('/user/:client_id/order/:order_id', (request, response) => {
    return usersController.getOrder(request, response);
});

router.post('/users', (request, response) => {
    return usersController.post(request, response);
});

export default router;
