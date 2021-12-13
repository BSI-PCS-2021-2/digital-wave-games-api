import { RSA_PUBLIC_KEY } from "../utils/secrets";

const expressJwt = require('express-jwt');

export const isAuthenticated = expressJwt({
    secret: RSA_PUBLIC_KEY, algorithms: ['RS256']
}); 