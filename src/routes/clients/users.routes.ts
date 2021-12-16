import { Router } from 'express';
import { usersController, confirmationCodesController, passwordRecoveryCodesController } from '../../controllers';


const router = Router();

router.get('/users', (request, response) => {
    return usersController.get(request, response);
});

router.get('/user/:username', (request, response) => {
    return usersController.get(request, response);
});

router.patch('/user/:username', (request, response) => {
    return usersController.patchByUsername(request, response);
});

router.get('/user/:client_id/orders', (request, response) => {
    return usersController.getOrders(request, response);
});

router.get('/user/:client_id/cart', (request, response) => {
    return usersController.getCart(request, response);
});

router.post('/users', (request, response) => {
    return usersController.post(request, response);
});

router.post('/confirmation-codes', (request, response) => {
    return confirmationCodesController.post(request, response);
});

router.post('/password-recovery-codes', (request, response) => {
    return passwordRecoveryCodesController.post(request, response);
});

// Mover para o controller addresses
router.get('/user/:id/addresses', (request, response) => {
    return usersController.getAddresses(request, response);
});

export default router;
