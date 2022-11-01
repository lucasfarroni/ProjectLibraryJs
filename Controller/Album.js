import {Media} from "./Media";

class Album extends Media {

  constructor(artists, nbTracks, title, releaseDate, rating, img) {
    super(title, releaseDate, rating, img);
    this.artists = artists;
    this.nbTracks = nbTracks;
  }


}