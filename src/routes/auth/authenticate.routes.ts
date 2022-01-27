import { Router } from "express";
import {
  authenticationController,
  googleAuthenticationController,
} from "../../controllers";

const router = Router();

router.post("/authenticate", (request, response) => {
  return authenticationController.post(request, response);
});

router.post("/authenticate-with-google", (request, response) => {
  return googleAuthenticationController.post(request, response);
});

export default router;
