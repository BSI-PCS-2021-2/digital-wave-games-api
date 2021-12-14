export class Product {
    public id?: number;
    public name?: string;
    public price?: number;
    public amount?: number;
    public rating?: number;
    public description?: string;
    public weight?: number;
    public height?: number;
    public deeph?: number;
    public releaseDate?: Date;
    public genderId?: number;
    public platformId?: number;
    public ratingSystemId?: number;


    constructor(props: Product) {
        Object.assign(this, props);
    }
}
