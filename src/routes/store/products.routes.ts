import { Router } from 'express';
import { productsController } from '../../controllers';


const router = Router();

router.get('/products', (request, response) => {
    return productsController.get(request, response);
});

export default router;
