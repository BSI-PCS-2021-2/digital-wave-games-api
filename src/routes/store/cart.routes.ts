import { Router } from 'express';
import { cartsController } from '../../controllers';


const router = Router();

router.get('/cart/:cart_id/items', (request, response) => {
    return cartsController.getCartItems(request, response);
});

router.post('/cart/:cart_id', (request, response) => {
    return cartsController.postCartItem(request, response);
});

router.put('/cart/:cart_id/item/:item_id', (request, response) => {
    return cartsController.putCartItem(request, response);
});

router.delete('/cart/:cart_id/item/:item_id', (request, response) => {
    return cartsController.deleteCartItem(request, response);
});

export default router;
