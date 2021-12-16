import { Router } from 'express';
import { walletsController } from '../../controllers';


const router = Router();

router.get('/wallets/:username', (request, response) => {
    return walletsController.get(request, response);
});

export default router;
