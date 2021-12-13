import { Router } from 'express';

import auth from './auth/authenticate.routes';
import users from './clients/users.routes';
import products from './store/products.routes';

const routes = Router();

routes.use('/auth/', auth);
routes.use('/clients/', users);
routes.use('/store/', products);

export default routes;
