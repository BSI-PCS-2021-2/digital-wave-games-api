import { Router } from 'express';
import { usersController } from '../../controllers';


const router = Router();

router.get('/users', (request, response) => {
    return usersController.get(request, response);
});

router.post('/users', (request, response) => {
    return usersController.post(request, response);
});

export default router;