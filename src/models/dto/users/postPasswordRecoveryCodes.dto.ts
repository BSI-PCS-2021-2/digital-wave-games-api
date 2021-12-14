export interface PostPasswordRecoveryCodesDTO {
    username: string;
    userId?: number;
    code?: string;
    expirationDate?: Date;
}
