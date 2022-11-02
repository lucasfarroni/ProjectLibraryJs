import {Media} from "./Media";

class Movie extends Media {
 constructor(director,actors,duration,plot, runTime, title, releaseDate, rating, img) {
     super(runTime, title, releaseDate, rating, img);
        this.director = director;
        this.actors = actors;
        this.duration = duration;
        this.plot = plot;
 }

}