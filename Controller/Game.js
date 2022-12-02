import {Media} from "./Media.js";

export class Game extends Media {
  constructor(studio,nbPlayers,plot, title, releaseDate, rating, img,description,type) {
    super( title, releaseDate, rating, img,description,type);
    this.studio = studio;
    this.nbPlayers = nbPlayers;
    this.plot = plot;


  }
}