export class User {
    public id?: number;
    public username?: string;
    public name?: string;
    public email?: string;
    public isEmailConfirmed?: boolean;
    public profileImage?: string;
    public failedLoginAttempts?: number;
    public nextAllowedAccess?: Date;
    public banned?: boolean;

    constructor(props: User) {
        Object.assign(this, props);
    }
}