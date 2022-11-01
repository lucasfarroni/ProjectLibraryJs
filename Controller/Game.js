import {Media} from "./Media";

class Game extends Media {
  constructor(studio,nbPlayers,plot, title, releaseDate, rating, img) {
    super(rating, img, title, releaseDate);
    this.studio = studio;
    this.nbPlayers = nbPlayers;
    this.plot = plot;


  }
}