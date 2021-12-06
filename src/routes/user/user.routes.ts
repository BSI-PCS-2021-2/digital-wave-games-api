import { Router } from "express";
import { getUsersController } from "../../controllers/getUsers";


const router = Router();

router.get('/getUsers', (request, response) => {
    request.setTimeout(0);
    return getUsersController.handle(request, response);
});

export default router;