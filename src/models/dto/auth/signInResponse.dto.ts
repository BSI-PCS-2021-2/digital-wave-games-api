import { Jwt } from "../../entities/jwt.model";

export interface SignInResponse {
    banned?: boolean,
    failedLoginAttempts?: number,
    nextAllowedAccess?: Date,
    jwt?: Jwt
}