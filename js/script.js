import {Collection} from "../Controller/Collection.js";
import {Media} from "../Controller/Media.js";

let collection = new Collection();
let tab = [];
let i = 0;
let typeOfMedia = "";
let boucle = 0;
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

    /*document.getElementById('type').addEventListener('click', function () {

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
    });*/

    document.getElementById('form').style.display = "block";


    document.getElementById('btnSubmit').addEventListener('click', function () {
        // i++;
        boucle++;
        console.log(boucle);

        let media = new Media(document.getElementById('title').value, document.getElementById('date').value, "rating", "img", document.getElementById('subject').value, document.getElementById('type').value);
        document.getElementById('form').style.display = "none";

        console.log(localStorage.getItem('Collection') === null);
        if (localStorage.getItem('Collection') !== null) {

            tab = JSON.parse(localStorage.getItem('Collection'));
            console.log(tab);
            let similar = media.title;
            let index = tab.findIndex((media) => media.title === similar);
            console.log(index);
            if (index === -1) {

                console.log("ok ya r dans la tab");
                //const a = await apiCall(media.title);
                //console.log(a);
                //media.img = a.Poster;
                tab.push(media);
                localStorage.setItem('Collection', JSON.stringify(tab));

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

            } else {
                alert("title exist in array modify the title for add this media");
            }

        } else {
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
            collection.addMedia(media);

        }
    });

});

/////////////////////////////////////////////////////////////LocalStorageAffichage

affichage("All");


function affichage(type) {
    let data = localStorage.getItem("Collection");
    if (data !== null) {
        let dataParse = JSON.parse(data);
        let txt = "";


        if (type === "All") {
            dataParse.forEach((e) => {
                txt +=
                    `<div class="card" "` + e.title + `" style="width: 18rem;">` +
                    `<img class="card-img-top" src="` + e.img + `" alt="Card image cap">` +
                    '<div class="card-body">' +
                    '<h5 class="card-title" id="titleOfMedia">' + e.title + '</h5>' +
                    '<p class="card-text">' + e.releaseDate + '</p>' +
                    '<p class="card-text">' + e.descritpion + '</p>' +
                    '</div>' + `<button type="button" id="remove` + i + `" class="btn-delete">delete</button>` +
                    `<button type="button" id="edit` + i + `" class="btn btn-primary">edit</button>` +
                    '</div>';
            });
        }


        if (type === "Album") {
            dataParse.forEach((e) => {
                if (e.type === "Album-btn") {
                    txt +=
                        `<div class="card" "` + e.title + `" style="width: 18rem;">` +
                        `<img class="card-img-top" src="` + e.img + `" alt="Card image cap">` +
                        '<div class="card-body">' +
                        '<h5 class="card-title" id="titleOfMedia">' + e.title + '</h5>' +
                        '<p class="card-text">' + e.releaseDate + '</p>' +
                        '<p class="card-text">' + e.descritpion + '</p>' +
                        '</div>' + `<button type="button" id="remove` + i + `" class="btn-delete">delete</button>` +
                        `<button type="button" id="edit` + i + `" class="btn btn-primary">edit</button>` +
                        '</div>';
                }
            });


        }

        if (type === "Game") {
            dataParse.forEach((e) => {
                if (e.type === "Game-btn") {
                    txt +=
                        `<div class="card" "` + e.title + `" style="width: 18rem;">` +
                        `<img class="card-img-top" src="` + e.img + `" alt="Card image cap">` +
                        '<div class="card-body">' +
                        '<h5 class="card-title" id="titleOfMedia">' + e.title + '</h5>' +
                        '<p class="card-text">' + e.releaseDate + '</p>' +
                        '<p class="card-text">' + e.descritpion + '</p>' +
                        '</div>' + `<button type="button" id="remove` + i + `" class="btn-delete">delete</button>` +
                        `<button type="button" id="edit` + i + `" class="btn btn-primary">edit</button>` +
                        '</div>';
                }
            });
        }

        if (type === "Movie") {

            dataParse.forEach((e) => {
                console.log(e.type)
                if (e.type === "Movie-btn") {
                    txt +=
                        `<div class="card" "` + e.title + `" style="width: 18rem;">` +
                        `<img class="card-img-top" src="` + e.img + `" alt="Card image cap">` +
                        '<div class="card-body">' +
                        '<h5 class="card-title" id="titleOfMedia">' + e.title + '</h5>' +
                        '<p class="card-text">' + e.releaseDate + '</p>' +
                        '<p class="card-text">' + e.descritpion + '</p>' +
                        '</div>' + `<button type="button" id="remove` + i + `" class="btn-delete">delete</button>` +
                        `<button type="button" id="edit` + i + `" class="btn btn-primary">edit</button>` +
                        '</div>';
                }
            });


        }

        //console.log(txt);
        document.getElementById("list").innerHTML = txt;
    }


};

function trie() {
    console.log(document.getElementById('trie').value);
    if (document.getElementById('trie').value !== "pas_trie") {
        console.log("trie");
        let data = localStorage.getItem("Collection");
        let dataParse = JSON.parse(data);
        let txt = "";
        if (document.getElementById('trie').value == "nom") {

            console.log("trie par nom");
            let dataTrie = dataParse.sort((a, b) => {
                return a.title.localeCompare(b.title);
            });

            dataTrie.forEach((e) => {
                txt +=
                    `<div class="card" "` + e.title + `" style="width: 18rem;">` +
                    `<img class="card-img-top" src="` + e.img + `" alt="Card image cap">` +
                    '<div class="card-body">' +
                    '<h5 class="card-title" id="titleOfMedia">' + e.title + '</h5>' +
                    '<p class="card-text">' + e.releaseDate + '</p>' +
                    '<p class="card-text">' + e.descritpion + '</p>' +
                    '</div>' + `<button type="button" id="remove` + i + `" class="btn-delete">delete</button>` +
                    `<button type="button" id="edit` + i + `" class="btn btn-primary">edit</button>` +
                    '</div>';

            });
        }


        document.getElementById("list").innerHTML = txt;
    } else {
        affichage("All");
    }
}

document.getElementById('trie').addEventListener('click', trie);

window.addEventListener('load', trie);


function deleteChild(element) {
    let e = element;

    //e.firstElementChild can be used.
    let child = e.lastElementChild;
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}


/////////////////////////////////////////////////////////////LocalStorageAffichage

document.addEventListener("click", function (e) {
    if (e.target.className === "btn-delete") {
        if (confirm("Voulez vous vraiment supprimer ce média ?") == true) {
            let Title = e.target.parentNode.querySelector("h5").textContent;
            let data = JSON.parse(localStorage.getItem("Collection"));
            let index = data.findIndex((e) => e.title === Title);
            data.splice(index, 1);
            localStorage.setItem("Collection", JSON.stringify(data));
            e.target.parentNode.remove();
        }
    }
});


document.addEventListener("click", function (e) {

    if (e.target.id === "All") {
        affichage("All");
    }

    if (e.target.id === 'Album') {
        affichage("Album");
    }
    if (e.target.id === 'Game') {
        affichage("Game");
    }
    if (e.target.id === 'Movie') {
        affichage("Movie");
    }
});

