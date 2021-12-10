import { Router } from 'express';
import { productsController } from '../../controllers';


const router = Router();

router.get('/products', (request, response) => {
    return productsController.get(request, response);
});

router.get('/product/:id', (request, response) => {
    // response.send("tagId is set to " + request.params.id);
    return productsController.getById(request, response);
});

export default router;
