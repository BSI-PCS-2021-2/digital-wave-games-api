import { Router } from 'express';
import { authenticationController } from '../../controllers';


const router = Router();

router.post('/authenticate', (request, response) => {
    return authenticationController.post(request, response);
});

export default router;