import { Router } from 'express';
import { cartsController } from '../../controllers';


const router = Router();

router.get('/cart/:cart_id/items', (request, response) => {
    console.log("On GET endpoint")
    return cartsController.getCartItems(request, response);
});

router.post('/cart/items', (request, response) => {
    console.log("On POST endpoint")
    return cartsController.postCartItem(request, response);
});

router.put('/cart/items/:item_id', (request, response) => {
    console.log("On PUT endpoint")
    return cartsController.putCartItem(request, response);
});

router.delete('/cart/items/:item_id', (request, response) => {
    console.log("On DELETE endpoint")
    return cartsController.deleteCartItem(request, response);
});

export default router;
