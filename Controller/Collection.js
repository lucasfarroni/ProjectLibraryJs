import {Media} from "./Media.js";

export class Collection {

    constructor() {
        this.collection = [];
    }

    addMedia(obj) {

        this.collection.push(obj);
        localStorage.setItem("Collection", JSON.stringify(this.collection));

    }

    getCollection() {
        return this.collection;
    }
}



