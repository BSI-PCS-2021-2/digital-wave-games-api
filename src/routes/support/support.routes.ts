import { Router } from 'express';
import { supportEmailController } from '../../controllers/';


const router = Router();

router.post('/support', (request, response) => {
    return supportEmailController.post(request, response);
});

export default router;