import { Router } from 'express';
import { usersController, confirmationCodesController } from '../../controllers';


const router = Router();

router.get('/users', (request, response) => {
    return usersController.get(request, response);
});

router.get('/user/:username', (request, response) => {
    return usersController.getByUsername(request, response);
});

router.get('/user/:client_id/orders', (request, response) => {
    return usersController.getOrdersByClient(request, response);
});

router.post('/users', (request, response) => {
    return usersController.post(request, response);
});

router.post('/confirmation-codes', (request, response) => {
    return confirmationCodesController.post(request, response);
});

export default router;
