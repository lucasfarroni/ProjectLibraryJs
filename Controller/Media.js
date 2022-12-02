export class Media {
    constructor(title, releaseDate  , rating , img , description,type) {
        this.title = title;
        this.releaseDate = releaseDate;
        this.rating = rating;
        this.img = img;
        this.description= description;
        this.type = type;

    }
    set setTitle(title) {
        this._title = title;
    }
    get getTitle() {
        return this._title;
    }
}