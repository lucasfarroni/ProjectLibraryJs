export class Media {
    constructor(title, releaseDate  , rating , img , descritpion,type) {
        this.title = title;
        this.releaseDate = releaseDate;
        this.rating = rating;
        this.img = img;
        this.descritpion = descritpion;
        this.type = type;

    }
    set setTitle(title) {
        this._title = title;
    }
    get getTitle() {
        return this._title;
    }
}