import {Collection} from "../Controller/Collection.js";
import {ratingStars} from "./ratingStars.js";
import {Game} from "../Controller/Game.js";
import {Album} from "../Controller/Album.js";
import {Movie} from "../Controller/Movie.js";
import {manualInsert, useApiAndInsertInCollection} from "./InsertManualOrWithApi.js";

let collection = new Collection();
let tab = [];
let i = 0;
let edit = false;
let ElementRec = "";
let typeOfMedia = "";
let typeTrie = "All";
let fait = false;
let manualOrWithApi = "";


/**
 * @description : control if media exist in collection
 * @param media
 * @param tab
 * @returns index -1 if not exist
 */
export function controlIfExistInCollection(media, tab) {
    let similar = media.title;
    return tab.findIndex((media) => media.title === similar);
}

/**
 * @description : return the good instance of media if type is movie, game or album
 * @param type
 * @returns {Game|Album|Movie}
 */
export function objectController(type) {
    if (type === "Game") {
        return new Game(document.getElementById("studio").value, "nbplayers", "plot", document.getElementById('title').value, document.getElementById('date').value, document.getElementById('rating').value, document.getElementById('basic-url').value, document.getElementById('subject').value, "Game");
    } else if (type === "Album") {
        return new Album(document.getElementById("Artist").value, "nbTracks", document.getElementById('title').value, document.getElementById('date').value, document.getElementById('rating').value, document.getElementById('basic-url').value, document.getElementById('subject').value, "Album");
    } else if (type === "Movie") {
        return new Movie("director", document.getElementById("actor").value, "duration", "plot", document.getElementById('title').value, document.getElementById('date').value, document.getElementById('rating').value, document.getElementById('basic-url').value, document.getElementById('subject').value, "Movie");
    }
}

/**
 * @description : return the good attribute specific attribute of media if type is movie, game or album
 * @param obj
 * @returns attribut
 */
export function addSpecificAttribut(obj) {
    let attribut = ""
    console.log(obj);
    if (obj.studio !== undefined) {
        console.log(obj.studio);
        attribut = obj.studio;
    } else if (obj.artists !== undefined) {
        console.log(obj.artists);
        attribut = obj.artists;
    } else if (obj._actors !== undefined) {
        console.log(obj._actors)
        attribut = obj._actors;
    }
    console.log(attribut);
    return attribut;
}

/**
 * @description : add balise html for media
 * @param obj
 * @param stars
 * @returns balise html with media attribut
 */
export function returnBalise(obj, stars) {
    let attribut = addSpecificAttribut(obj);
    let txtTest = "";

    txtTest = `<div class="card" "` + obj.title + `" style="width: 18rem;">` +
        `<img class="card-img-top" src="` + obj.img + `" alt="Card image cap">` +
        '<div class="card-body">' +
        '<h5 class="card-title" id="titleOfMedia">' + obj.title + '</h5>' +
        '<p class="card-text">' + obj.releaseDate + '</p>' +
        '<p class="card-text">' + obj.description + '</p>' +
        `<div class="card-text" id="insertSpecificAttribut">` + attribut + `</div>` +
        '</div>' +
        '<div class="divRating">' +
        `<div class="rating" id="ratingId">` +
        `<span class="rating__result"></span>` +
        stars +
        `</div>` +
        `<button type="button" id="remove` + i + `" class="btn-delete">delete</button>` +
        `<button type="button" id="edit` + i + `" class="btn-edit">edit</button>` +
        '</div>' +
        '</div>'
    ;
    return txtTest;
}

/**
 * @name apiCall
 * @description fetch the data from the API omdbapi.com
 * @param {string} movieTitle
 * @returns {Promise<any>}
 */
export async function apiCall(movieTitle) {
    let options = {
        method: 'GET'
    };
    return await fetch("http://omdbapi.com/?apikey=3ace04ab&t=" + movieTitle, options)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data.Poster);

            return data;
        })
        .catch(error => console.log(error));
}

/**
 * @name addMedia
 * @description add a media to the collection
 */
document.getElementById('btnAddMedia').addEventListener('click', function () {

    document.getElementById('type').value = "";
    document.getElementById('ManualOrApi').value = "Api";
    document.getElementById('form').style.display = "block";


});

document.getElementById('closeForm').addEventListener('click', function () {
    document.getElementById('form').style.display = "none";
    document.getElementById('manual').style.display = "none";
    document.getElementById('title').value = "";
    document.getElementById('date').value = "";
    document.getElementById('subject').value = "";
    document.getElementById('basic-url').value = "";
    //document.getElementById('rating').value = "";
    document.getElementById('type').value = "Album-btn";
    document.getElementById('ManualOrApi').value = "Api";
    edit = false;
});

document.addEventListener('click', function (e) {
    if (e.target.className === "btn-edit") {
        edit = true;
        ElementRec = e;
        document.getElementById('form').style.display = "block";
        document.getElementById('ManualOrApi').value = "Manual";
        ManualorApif();
        document.getElementById('title').value = e.target.parentNode.parentNode.querySelector("h5").textContent;
        document.getElementById('date').value = e.target.parentNode.parentNode.querySelector("p").textContent;
        document.getElementById('subject').value = e.target.parentNode.parentNode.querySelector("p:nth-child(3)").textContent;
        document.getElementById('basic-url').value = e.target.parentNode.parentNode.querySelector("img").src;
        let data = localStorage.getItem("Collection");
        let dataParse = JSON.parse(data);
        dataParse.forEach((s) => {
            if (s.title === e.target.parentNode.parentNode.querySelector("h5").textContent) {
                document.getElementById('rating').value = s.rating;
                let type = s.type;
                if (type === "Album") {
                    document.getElementById('type').value = "Album-btn";
                }
                if (type === "Game") {
                    document.getElementById('type').value = "Game-btn";
                }
                if (type === "Movie") {
                    document.getElementById('type').value = "Movie-btn";
                }
                types();

            }
        });
    }
});

let media = "";
document.getElementById('type').addEventListener('click', function () {

    types();


});


function types() {
    console.log(document.getElementById('type').value);
    switch (document.getElementById('type').value) {

        case "Album-btn":
            console.log("album");
            typeOfMedia = "Album";
            document.getElementById('specificType').innerHTML =
                '<div class="form-group">' +
                '<label htmlFor="Artist">Name of the artist</label>' +
                '<input type="text" class="form-control" id="Artist" placeholder="Example input">' +
                '</div>';
            //media = new Album(document.getElementById("Artist").value, "nbTracks", document.getElementById('title').value, document.getElementById('date').value, "rating", "img","description");
            //console.log(media);
            break;

        case "Game-btn":
            console.log("Game");
            typeOfMedia = "Game";
            document.getElementById('specificType').innerHTML =
                '<div class="form-group">' +
                '<label htmlFor="studio">Name of the studio</label>' +
                '<input type="text" class="form-control" id="studio" placeholder="Example input">' +
                '</div>';
            //media = new Game(document.getElementById("studio").value, "nbplayers", "plot", document.getElementById('title').value, document.getElementById('date').value, "rating", "img","description");
            // console.log(media);
            break;

        case "Movie-btn":
            console.log("movie");
            typeOfMedia = "Movie";
            document.getElementById('specificType').innerHTML =
                '<div class="form-group">' +
                '<label htmlFor="actor">Name of the actor</label>' +
                '<input type="text" class="form-control" id="actor" placeholder="Example input">' +
                '</div>';
            //media = new Movie("director", document.getElementById("actor").value, "duration", "plot", document.getElementById('title').value, document.getElementById('date').value, "rating", "img","description");
            //console.log(media);
            break;
    }
}

document.getElementById('ManualOrApi').addEventListener('click', function () {

    ManualorApif();
});
if (manualOrWithApi === "") {
    manualOrWithApi = "WithApi";
}

function ManualorApif() {
    console.log(document.getElementById('ManualOrApi').value);
    switch (document.getElementById('ManualOrApi').value) {
        case "Manual":
            console.log("manual la");
            document.getElementById('manual').style.display = "block";
            manualOrWithApi = "manual";
            break;
        case "Api":
            manualOrWithApi = "WithApi";
            document.getElementById('manual').style.display = "none";
            break;
    }
}


document.getElementById('btnSubmit').addEventListener('click', async function () {
    if (edit === true) {
        deleteMedia(ElementRec);
        edit = false
        ElementRec = "";
    }
    //console.log(media);
    //let media = new Media(document.getElementById('title').value, document.getElementById('date').value, "rating", "img", document.getElementById('subject').value, document.getElementById('type').value);

    document.getElementById('form').style.display = "none";
    document.getElementById('manual').style.display = "none";
    if (manualOrWithApi === 'WithApi') {
        await useApiAndInsertInCollection(media, typeOfMedia, tab, collection, typeTrie);//Add media with api attribute
    } else {
        manualInsert(media, typeOfMedia, tab, collection, typeTrie);//Add media with manual input
    }
});

/**
 * @name affichage
 * @description display the collection
 * @param {string} type
 */
affichage("All");

export function affichage(type, tableau) {
    let data = localStorage.getItem("Collection");

    if (data !== null || tableau !== undefined) {
        let dataParse = JSON.parse(data);
        if (tableau !== undefined) {
            dataParse = tableau;
        }
        let txt = "";
        console.log(type === "All");
        if (type === "All") {//display all of the media

            dataParse.forEach((e) => {
                let stars = ratingStars(e.rating);
                let insertInHtml = returnBalise(e, stars);
                txt +=
                    insertInHtml;
            });
        }
        if (type === "Album") {//display the album
            dataParse.forEach((e) => {
                console.log(e.type === "Album-btn");
                if (e.type === "Album") {
                    let stars = ratingStars(e.rating);//call the function ratingStars for display the stars
                    let insertInHtml = returnBalise(e, stars);// call the function returnBalise for display the media
                    txt +=
                        insertInHtml;
                }
            });
        }
        if (type === "Game") {//display the game
            dataParse.forEach((e) => {
                if (e.type === "Game") {
                    let stars = ratingStars(e.rating);//call the function ratingStars for display the stars
                    let insertInHtml = returnBalise(e, stars);// call the function returnBalise for display the media
                    txt +=
                        insertInHtml;
                }
            });
        }
        if (type === "Movie") {//display the movie

            dataParse.forEach((e) => {
                console.log(e.type)
                if (e.type === "Movie") {
                    let stars = ratingStars(e.rating);//call the function ratingStars for display the stars
                    let insertInHtml = returnBalise(e, stars);// call the function returnBalise for display the media
                    txt +=
                        insertInHtml;
                }
            });
        }
        document.getElementById("list").innerHTML = txt;
    }
}

/**
 * @name trie
 * @description function sort the collection
 */
function trie() {
    console.log(document.getElementById('trie').value);
    if (document.getElementById('trie').value !== "pas_trie") {
        console.log("trie");
        let data = localStorage.getItem("Collection");
        let dataParse = JSON.parse(data);
        let txt = "";
        if (document.getElementById('trie').value === "nom") {
            let dataTrie = dataParse.sort((a, b) => {
                return a.title.localeCompare(b.title);
            });
            affichage(typeTrie, dataTrie);
        }
        if (document.getElementById('trie').value === "date_de_sortie") {
            let dataTrie = dataParse.sort((a, b) => {
                return a.releaseDate.localeCompare(b.releaseDate);
            });

            affichage(typeTrie, dataTrie);
        }

    } else {
        affichage(typeTrie);
    }
}

document.getElementById('trie').addEventListener('click', trie);
window.addEventListener('load', trie);

/**
 *
 * @name deleteChild
 * @description delete the child of the element
 *  @param  e
 */
function deleteMedia(e) {

    let Title = e.target.parentNode.parentNode.querySelector("h5").textContent;
    let data = JSON.parse(localStorage.getItem("Collection"));
    let index = data.findIndex((e) => e.title === Title);
    data.splice(index, 1);//delete the media in the collection
    localStorage.setItem("Collection", JSON.stringify(data));
    e.target.parentNode.parentNode.remove();
}

/**
 *  @description confirm the delete of the media
 */
document.addEventListener("click", function (e) {

    if (e.target.className === "btn-delete") {
        if (confirm("Voulez vous vraiment supprimer ce média ?") === true) {
            deleteMedia(e);
        }
    }
});
/**
 * @description sort the media by type (ALL, ALBUM, GAME, MOVIE)
 */
document.addEventListener("click", function (e) {

    if (e.target.id === "All") {//if the user click on the button All
        typeTrie = "All";
        console.log(typeTrie);
        trie();
    }

    if (e.target.id === 'Album') {//if the user click on the button Album
        typeTrie = "Album";
        console.log(typeTrie);
        trie();
    }
    if (e.target.id === 'Game') {//if the user click on the button Game
        typeTrie = "Game";
        console.log(typeTrie);
        trie();
    }
    if (e.target.id === 'Movie') {//if the user click on the button Movie
        typeTrie = "Movie";
        console.log(typeTrie);
        trie();
    }
});

