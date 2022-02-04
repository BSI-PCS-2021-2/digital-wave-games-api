export interface PostProductDTO {
    name?: string;
    price?: number;
    amount?: number;
    description?: string;
    releaseDate?: Date;
    imgUrl?: string;
    youtubeIds?: string[];
    genderId?: number;
    platformId?: number;
    publisherId?: number;
    ratingSystemId?: number;
}