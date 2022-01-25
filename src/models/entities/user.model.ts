export class User {
    public id?: number;
    public username?: string;
    public name?: string;
    public email?: string;
    public isEmailConfirmed?: boolean;
    public profileImage?: string;
    public tel?: string;
    public cel1?: string;
    public cel2?: string;
    public secondaryEmail?: string;
    public failedLoginAttempts?: number;
    public nextAllowedAccess?: Date;
    public banned?: boolean;
    public resetFailedLoginAttempts?: Date

    constructor(props: User) {
        Object.assign(this, props);
    }
}