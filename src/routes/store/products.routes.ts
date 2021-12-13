import { Router } from 'express';
import { productsController } from '../../controllers';


const router = Router();

router.get('/products', (request, response) => {
    return productsController.get(request, response);
});

router.get('/product/:id', (request, response) => {
    return productsController.getById(request, response);
});

export default router;
