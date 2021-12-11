import { Router } from 'express';
import { usersController } from '../../controllers';


const router = Router();

router.get('/users', (request, response) => {
    return usersController.get(request, response);
});

router.get('/user/:username', (request, response) => {
    return usersController.getByUsername(request, response);
});

router.post('/users', (request, response) => {
    return usersController.post(request, response);
});

router.get('/user/:client_id/orders', (request, response) => {
    console.log('dentro do roteamento')
    return usersController.getOrdersByClient(request, response);
});

export default router;
