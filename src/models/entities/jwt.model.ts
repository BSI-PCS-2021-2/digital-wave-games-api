export class Jwt {
    public idToken?: string;
    public expiresIn?: number;
    public username?: string;

    constructor(props: Jwt) {
        Object.assign(this, props);
    }
}