import {Media} from "./Media";

class Movie extends Media {
 constructor(director,actors,duration,plot, runTime, title, releaseDate, rating, img,description) {
     super(runTime, title, releaseDate, rating, img,description);
        this.director = director;
        this.actors = actors;
        this.duration = duration;
        this.plot = plot;
 }

    set director(director) {
     this._director = director;
 }

    get director() {
        return this._director;
    }

    set actors(actors) {
        this._actors = actors;
    }
    get actors() {
        return this._actors;
    }

    set duration(duration) {
        this._duration = duration;
    }

    get duration() {
        return this._duration;
    }

    set plot(plot) {
        this._plot = plot;
    }

    get plot() {
        return this._plot;
    }

}