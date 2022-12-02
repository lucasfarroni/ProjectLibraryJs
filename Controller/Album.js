import {Media} from "./Media.js";

export class Album extends Media {

  constructor(artists, nbTracks, title, releaseDate, rating, img,description,type) {
    super( title, releaseDate, rating, img,description,type);
    this.artists = artists;
    this.nbTracks = nbTracks;
  }

}