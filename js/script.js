import {Collection} from "../Controller/Collection.js";
import {Media} from "../Controller/Media.js";
import {ratingStars} from "./ratingStars.js";

let collection = new Collection();
let tab = [];
let i = 0;
let typeOfMedia = "";
let typeTrie = "All";
let fait = false;

/**
 * @param e
 * @param stars
 * @description this function is used to insert html in code
 * @returns {string}
 */
function returnBalise(e, stars) {
    let txtTest = "";
    txtTest = `<div class="card" "` + e.title + `" style="width: 18rem;">` +
        `<img class="card-img-top" src="` + e.img + `" alt="Card image cap">` +
        '<div class="card-body">' +
        '<h5 class="card-title" id="titleOfMedia">' + e.title + '</h5>' +
        '<p class="card-text">' + e.releaseDate + '</p>' +
        '<p class="card-text">' + e.descritpion + '</p>' +
        `<div class="rating" id="ratingId">` +
        `<span class="rating__result"></span>` +
        stars +
        `</div>` +
        '</div>' + `<button type="button" id="remove` + i + `" class="btn-delete">delete</button>` +
        `<button type="button" id="edit` + i + `" class="btn btn-primary">edit</button>` +
        '</div>';
    return txtTest;
}

/**
 * @name apiCall
 * @description fetch the data from the API omdbapi.com
 * @param {string} movieTitle
 * @returns {Promise<any>}
 */
async function apiCall(movieTitle) {
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
    document.getElementById('closeForm').addEventListener('click', function () {
        document.getElementById('form').style.display = "none";
    });

    document.getElementById('type').addEventListener('click', function () {

        switch (document.getElementById('type').value) {

            case "Album-btn":
                console.log("album");
                typeOfMedia = "Album";
                break;
            case "Game-btn":
                console.log("Game");
                typeOfMedia = "Game";
                break;
            case "Movie-btn":
                console.log("livre");
                typeOfMedia = "Movie";
                break;
        }
        return typeOfMedia;
    });

    document.getElementById('form').style.display = "block";

});

document.getElementById('btnSubmit').addEventListener('click', async function () {

    let media = new Media(document.getElementById('title').value, document.getElementById('date').value, "rating", "img", document.getElementById('subject').value, document.getElementById('type').value);
    document.getElementById('form').style.display = "none";

    if (localStorage.getItem('Collection') !== null) {

        tab = JSON.parse(localStorage.getItem('Collection'));
        let similar = media.title;
        let index = tab.findIndex((media) => media.title === similar);//find the index of the media with the same title
        console.log(index);
        if (index === -1) {//if the media is not in the collection
            console.log("collection exist");
            console.log("media ajouté");
            const a = await apiCall(media.title);//call the api
            media.img = a.Poster;//add the poster to the media
            media.rating = a.imdbRating;//add the rating to the media
            console.log("je suis la");
            tab.push(media);
            localStorage.setItem('Collection', JSON.stringify(tab));
            affichage(typeTrie);//display the collection
        } else {
            alert("title exist in array modify the title for add this media");//if the media is in the collection
        }
    } else {//if the collection is empty
        document.getElementById('containerList').innerHTML +=

            `<div class="card" "` + media.title + `" style="width: 18rem;">` +
            `<img class="card-img-top" src="` + media.img + `" alt="Card image cap">` +
            '<div class="card-body">' +
            '<h5 class="card-title">' + media.title + '</h5>' +
            '<p class="card-text">' + media.releaseDate + '</p>' +
            '<p class="card-text">' + media.descritpion + '</p>' +
            '</div>' + `<button type="button" id="remove` + i + `" class="btn-delete">delete</button>` +
            `<button type="button" id="edit` + i + `" class="btn btn-primary">edit</button>` +
            '</div>';
        console.log("test");
        collection.addMedia(media);//add the media to the collection

    }
});
/**
 * @name affichage
 * @description display the collection
 * @param {string} type
 */
affichage("All");

function affichage(type, tableau) {
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
                if (e.type === "Album-btn") {
                    let stars = ratingStars(e.rating);//call the function ratingStars for display the stars
                    let insertInHtml = returnBalise(e, stars);// call the function returnBalise for display the media
                    txt +=
                        insertInHtml;
                }
            });
        }
        if (type === "Game") {//display the game
            dataParse.forEach((e) => {
                if (e.type === "Game-btn") {
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
                if (e.type === "Movie-btn") {
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
 *  @param  element
 */

function deleteChild(element) {
    let e = element;
    //e.firstElementChild can be used.
    let child = e.lastElementChild;
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}

/**
 *  @description confirm the delete of the media
 */
document.addEventListener("click", function (e) {
    if (e.target.className === "btn-delete") {
        if (confirm("Voulez vous vraiment supprimer ce média ?") === true) {
            let Title = e.target.parentNode.querySelector("h5").textContent;
            let data = JSON.parse(localStorage.getItem("Collection"));
            let index = data.findIndex((e) => e.title === Title);
            data.splice(index, 1);//delete the media in the collection
            localStorage.setItem("Collection", JSON.stringify(data));
            e.target.parentNode.remove();
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

