import { Router } from 'express';

import auth from './auth/authenticate.routes';
import users from './clients/users.routes';
import wallets from './clients/wallets.routes';
import products from './store/products.routes';
import orders from './store/orders.routes';
import carts from './store/cart.routes';

const routes = Router();

routes.use('/auth/', auth);
routes.use('/clients/', users);
routes.use('/clients/', wallets);
routes.use('/store/', products);
routes.use('/store/', orders);
routes.use('/store/', carts);

export default routes;
