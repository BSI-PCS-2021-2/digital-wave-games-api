import { Gender } from "./gender.mode";
import { Platform } from "./platform.model";
import { Publisher } from "./publisher.model";
import { RatingSystem } from "./ratingSystem";

export class Product {
    public id?: number;
    public name?: string;
    public price?: number;
    public amount?: number;
    public description?: string;
    public releaseDate?: Date;
    public imgUrl?: string;
    public youtubeIds?: string[];
    public gender?: Gender;
    public platform?: Platform;
    public publisher?: Publisher;
    public ratingSystem?: RatingSystem

    constructor(props: Product) {
        Object.assign(this, props);
    }
}
