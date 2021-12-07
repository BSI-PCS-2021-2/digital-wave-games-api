export class User {
    public id: number;
    public name: string;
    public email: string;

    constructor(props: User) {
        Object.assign(this, props);
    }
}