import { Router } from 'express';
import { walletsController } from '../../controllers';


const router = Router();

router.get('/wallets/:username', (request, response) => {
    return walletsController.get(request, response);
});

router.put('/wallets', (request, response) => {
    return walletsController.put(request, response);
});

export default router;
