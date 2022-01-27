import {
  Jwt,
  PostAddressDTO,
  PostCartDTO,
  PostSignInDTO,
  PostUserDTO,
  User,
} from "../models";
import logger from "../utils/logger";
import * as jsonwebtoken from "jsonwebtoken";
import { ENCRYPTION_SECRET, RSA_PRIVATE_KEY } from "../utils/secrets";
import {
  AddressesRepository,
  CartsRepository,
  UsersRepository,
  WalletsRepository,
} from "../repositories";
import sha256 from "crypto-js/sha256";
import { SignInResponse } from "../models/dto/auth/signInResponse.dto";
import { statSync } from "fs";
import { PostGoogleSignInDTO } from "../models/dto/auth/postGoogleSignIn.dto";

export class GoogleAuthenticationService {
  constructor(
    private usersRepository: UsersRepository,
    private addressesRepository: AddressesRepository,
    private cartsRepository: CartsRepository,
    private walletsRepository: WalletsRepository
  ) {}

  async post(
    postGoogleSignInDTO: PostGoogleSignInDTO
  ): Promise<SignInResponse | null> {
    const email = postGoogleSignInDTO.email;
    const id = postGoogleSignInDTO.id;
    const name = this.generateGoogleUsername(postGoogleSignInDTO.name);

    let jwt: Jwt | null = null;
    let response: SignInResponse | null = null;

    try {
      let user: User | null = await this.usersRepository.getUser(name);

      if (user == null) {
        let password = sha256(id + ENCRYPTION_SECRET).toString();

        let postUserDTO: PostUserDTO = {
          cep: undefined,
          email: email,
          username: name,
          name: postGoogleSignInDTO.name,
          password: password,
          postalCode: undefined,
          city: undefined,
          state: undefined,
          district: undefined,
          number: undefined,
          additionalInfo: undefined,
          street: undefined,
          phone1: undefined,
          phone2: undefined,
          phone3: undefined,
          secondaryEmail: undefined,
          code: undefined,
        };

        const response: number[] = await this.usersRepository.postUser(
          postUserDTO
        );

        let address: PostAddressDTO = {
          cep: postUserDTO.cep,
          postalCode: postUserDTO.postalCode,
          city: postUserDTO.city,
          district: postUserDTO.district,
          street: postUserDTO.street,
          number: postUserDTO.number,
          additionalInfo: postUserDTO.additionalInfo,
          state: postUserDTO.state,
          clientId: response[0],
        };

        let cart: PostCartDTO = {
          clientId: response[0],
        };

        await this.addressesRepository.postAddress(address);
        await this.cartsRepository.postCart(cart);
        await this.walletsRepository.postWallet(response[0]);
      }

      const dbPassword: string = await this.usersRepository.getUserPassword(
        name
      );

      if (dbPassword === sha256(id + ENCRYPTION_SECRET).toString()) {
        const jwtBearerToken = jsonwebtoken.sign({}, RSA_PRIVATE_KEY, {
          algorithm: "RS256",
          expiresIn: 86400, // um dia
          subject: name,
        });

        jwt = {
          idToken: jwtBearerToken,
          expiresIn: 86400,
          username: name,
          userId: user?.id,
        };
        response = {
          nextAllowedAccess: user?.nextAllowedAccess,
          banned: user?.banned,
          failedLoginAttempts: user?.failedLoginAttempts,
          jwt: jwt,
        };
      }
    } catch (error: any) {
      logger.error(error);
      throw new Error(error);
    }
    return response;
  }

  generateGoogleUsername(name: string): string {
    return `g-${name.replace(/\s/g, "")}`;
  }
}
