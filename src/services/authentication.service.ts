import { Jwt, PostSignInDTO, User } from "../models";
import logger from "../utils/logger";
import * as jsonwebtoken from 'jsonwebtoken';
import { ENCRYPTION_SECRET, RSA_PRIVATE_KEY } from "../utils/secrets";
import { UsersRepository } from "../repositories";
import sha256 from 'crypto-js/sha256';
import { SignInResponse } from "../models/dto/auth/signInResponse.dto";
import { statSync } from "fs";

export class AuthenticationService {

    constructor(private usersRepository: UsersRepository) { }

    async post(postSignInDTO: PostSignInDTO): Promise<SignInResponse | null> {

        const username = postSignInDTO.username;
        const password = postSignInDTO.password;

        let jwt: Jwt | null = null;
        let response: SignInResponse | null = null;

        try {

           
            let user: User | null = await this.usersRepository.getUser(username);

            if (user?.banned) {
                console.log(user.banned)
                user = await this.usersRepository.increaseFailedLoginAttempt(username);
                response = {
                    nextAllowedAccess: user?.nextAllowedAccess,
                    banned: user?.banned,
                    failedLoginAttempts: user?.failedLoginAttempts
                }
                return response;
            }

            const dbPassword: string = await this.usersRepository.getUserPassword(username);

            if (dbPassword === sha256(password + ENCRYPTION_SECRET).toString()) {
                
                const jwtBearerToken = jsonwebtoken.sign({}, RSA_PRIVATE_KEY, {
                    algorithm: 'RS256',
                    expiresIn: 86400, // um dia
                    subject: username
                });

                jwt = {
                    idToken: jwtBearerToken, 
                    expiresIn: 86400,
                    username: username,
                    userId: user?.id
                };
                response = {
                    nextAllowedAccess: user?.nextAllowedAccess,
                    banned: user?.banned,
                    failedLoginAttempts: user?.failedLoginAttempts,
                    jwt: jwt
                }
                
            } else {
                user = await this.usersRepository.increaseFailedLoginAttempt(username);
                response = {
                    nextAllowedAccess: user?.nextAllowedAccess,
                    banned: user?.banned,
                    failedLoginAttempts: user?.failedLoginAttempts
                }
            }
            
        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
        return response;

    }

}
