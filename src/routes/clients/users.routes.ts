import { Router } from 'express';
import { usersController, confirmationCodesController, passwordRecoveryCodesController } from '../../controllers';


const router = Router();

router.get('/users', (request, response) => {
    return usersController.get(request, response);
});

router.get('/user/:username', (request, response) => {
    return usersController.getByUsername(request, response);
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

router.post('/change-password', (request, response) => {
    return usersController.changePassword(request, response);
});

router.get('/user/:id/addresses', (request, response) => {
    return usersController.getAddresses(request, response);
});

router.post('/user/address', (request, response) => {
    return usersController.postAddress(request, response);
});

router.put('/user/infos', (request, response) => {
    console.log("route")
    return usersController.putInfos(request, response);
});

router.put('/user/address', (request, response) => {
    return usersController.putAddress(request, response);
});

router.delete('/user/:clientId/address/:addressId', (request, response) => {
    return usersController.deleteAddress(request, response);
});
export default router;
