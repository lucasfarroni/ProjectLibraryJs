import {ratingStars} from "./ratingStars.js";
import {objectController , controlIfExistInCollection , apiCall ,affichage , addSpecificAttribut, returnBalise } from "./script.js";
import {Collection} from "../Controller/Collection.js";




export function manualInsert(media,typeOfMedia,tab,collection,typeTrie){

    if (typeOfMedia === "") {
        alert("Please select a type and after submit");
        media = "";
    } else {
        media = objectController(typeOfMedia);
        console.log(media);
        typeOfMedia = "";
        console.log("ok")

        if (localStorage.getItem('Collection') !== null) {
            tab = JSON.parse(localStorage.getItem('Collection'));
            let index = controlIfExistInCollection(media, tab);//find the index of the media with the same title
            console.log(index);
            if (index === -1) {//if the media is not in the collection
                console.log("Manual insert collection not vide insert");
                console.log(media);
                let stars = ratingStars(media.rating);//call the function ratingStars for display the stars
                document.getElementById("list").innerHTML = returnBalise(media, stars);
                tab.push(media);
                localStorage.setItem('Collection', JSON.stringify(tab));
                affichage(typeTrie);//display the //add the media to the collection
            } else {
                alert("This media is already in the collection");
            }
        }else {
            console.log("Manual insert if collection vide");
            let stars = ratingStars(media.rating);//call the function ratingStars for display the stars
            document.getElementById("list").innerHTML = returnBalise(media, stars);
            collection.addMedia(media);//add the media to the collection
        }
    }
}

export async function useApiAndInsertInCollection(media,typeOfMedia,tab,collection,typeTrie) {

    if (typeOfMedia === "") {
        alert("Please select a type and after submit");
        media = "";
    } else {
        media = objectController(typeOfMedia);
        console.log(media);
        typeOfMedia = "";
        console.log("ok")
//-------------------------------------------------main-------------------------------------------------//
        if (localStorage.getItem('Collection') !== null) {
            tab = JSON.parse(localStorage.getItem('Collection'));
            let index = controlIfExistInCollection(media, tab);//find the index of the media with the same title
            console.log(index);
            if (index === -1) {//if the media is not in the collection
                console.log("collection exist");
                console.log("media ajouté");
                const a = await apiCall(media.title);//call the api
                media.img = a.Poster;//add the poster to the media
                media.rating = a.imdbRating;//add the rating to the media
                media.description = a.Plot;//add the description to the media
                console.log("je suis la");
                tab.push(media);
                localStorage.setItem('Collection', JSON.stringify(tab));
                affichage(typeTrie);//display the collection
            } else {
                alert("title exist in array modify the title for add this media");//if the media is in the collection
                media = "";
            }
        } else {//if the collection is empty
            const a = await apiCall(media.title);//call the api
            media.img = a.Poster;//add the poster to the media
            media.rating = a.imdbRating;//add the rating to the media
            media.description = a.Plot;//add the description to the media
            console.log("je suis la dans la collect vide");
            let stars = ratingStars(media.rating);//call the function ratingStars for display the stars
            document.getElementById("list").innerHTML = returnBalise(media, stars);
            collection.addMedia(media);//add the media to the collection
        }
    }
}