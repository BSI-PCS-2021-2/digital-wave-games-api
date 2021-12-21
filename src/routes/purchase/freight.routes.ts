import { Router } from 'express';
import { freightController } from '../../controllers';


const router = Router();

router.post('/calculate-freight', (request, response) => {
    return freightController.calculateFreight(request, response);
});

export default router;