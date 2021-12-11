import { Router } from 'express';

import users from './clients/users.routes';
import products from './store/products.routes';
import orders from './store/orders.routes';

const routes = Router();

routes.use('/clients/', users);
routes.use('/store/', products);
routes.use('/store/', orders);

export default routes;
