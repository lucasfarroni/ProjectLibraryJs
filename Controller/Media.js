export class Media {
    constructor(title, releaseDate  , rating , img , descritpion) {
        this.title = title;
        this.releaseDate = releaseDate;
        this.rating = rating;
        this.img = img;
        this.descritpion = descritpion;
    }
    set setTitle(title) {
        this._title = title;
    }
    get getTitle() {
        return this._title;
    }
}