export class Media {
    constructor(title, releaseDate  , rating , img) {
        this.title = title;
        this.releaseDate = releaseDate;
        this.rating = rating;
        this.img = img;
    }
    set setTitle(title) {
        this._title = title;
    }
    get getTitle() {
        return this._title;
    }
}