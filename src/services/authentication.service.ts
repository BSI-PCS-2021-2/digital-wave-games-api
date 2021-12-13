import { Jwt, PostSignInDTO } from "../models";
import logger from "../utils/logger";
import * as jsonwebtoken from 'jsonwebtoken';
import { ENCRYPTION_SECRET, RSA_PRIVATE_KEY } from "../utils/secrets";
import { UsersRepository } from "../repositories";
import sha256 from 'crypto-js/sha256';

export class AuthenticationService {

    constructor(private usersRepository: UsersRepository) { }

    async post(postSignInDTO: PostSignInDTO): Promise<Jwt | null> {

        const username = postSignInDTO.username;
        const password = postSignInDTO.password;

        let jwt: Jwt | null = null;

        try {

            const dbPassword: string = await this.usersRepository.getUserPassword(username);

            if (dbPassword === sha256(password + ENCRYPTION_SECRET).toString()) {
                const jwtBearerToken = jsonwebtoken.sign({}, RSA_PRIVATE_KEY, {
                    algorithm: 'RS256',
                    expiresIn: 60,
                    subject: username
                });

                jwt = {
                    idToken: jwtBearerToken, 
                    expiresIn: 60,
                    username: username
                };
            }

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

        return jwt;

    }

}