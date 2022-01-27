import { Router } from "express";

import auth from "./auth/authenticate.routes";
import users from "./clients/users.routes";
import wallets from "./clients/wallets.routes";
import charges from "./clients/charges.routes";
import products from "./store/products.routes";
import orders from "./store/orders.routes";
import carts from "./store/cart.routes";
import payment from "./purchase/payment.routes";
import freight from "./purchase/freight.routes";
import support from "./support/support.routes";

const routes = Router();

routes.use("/support/", support);
routes.use("/auth/", auth);
routes.use("/clients/", users);
routes.use("/clients/", wallets);
routes.use("/clients/", charges);
routes.use("/store/", products);
routes.use("/store/", orders);
routes.use("/store/", carts);
routes.use("/purchase/", payment);
routes.use("/purchase/", freight);

export default routes;
