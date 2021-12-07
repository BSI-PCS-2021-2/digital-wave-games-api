import { Router } from 'express';

import users from './clients/users.routes';

const routes = Router();

routes.use('/clients/', users);

export default routes;