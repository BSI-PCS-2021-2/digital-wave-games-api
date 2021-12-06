export class User {
    public id: number;
    public name: string;

    constructor(props: User) {
        Object.assign(this, props);
    }
}