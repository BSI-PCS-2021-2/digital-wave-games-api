export class Jwt {
    public idToken?: string;
    public expiresIn?: number;
    public username?: string;
    public userId?: number;

    constructor(props: Jwt) {
        Object.assign(this, props);
    }
}