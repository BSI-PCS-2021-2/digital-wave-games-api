import { Router } from "express";
import { chargesController } from "../../controllers";

const router = Router();

router.post("/charges", (request, response) => {
  return chargesController.post(request, response);
});

export default router;
