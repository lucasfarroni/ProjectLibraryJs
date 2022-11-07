import {Collection} from "../Controller/Collection.js";
import {Media} from "../Controller/Media.js";

let collection = new Collection();
let tab = [];
//collection.addMedia(media);
//console.log(collection.collection);




let i = 0;

document.getElementById('btnAddMedia').addEventListener('click', function () {

    document.getElementById('form').style.display = "block";

    document.getElementById('btnSubmit').addEventListener('click', function () {
        // i++;

        let media = new Media(document.getElementById('title').value, document.getElementById('date').value, "rating", "img",document.getElementById('subject').value);
        document.getElementById('form').style.display = "none";

        document.getElementById('containerList').innerHTML +=

            `<div class="card" "` +  media.title + `" style="width: 18rem;">` +
            '<img class="card-img-top" src="#" alt="Card image cap">' +
            '<div class="card-body">' +
            '<h5 class="card-title">' +  media.title + '</h5>' +
            '<p class="card-text">' +  media.releaseDate + '</p>' +
            '<p class="card-text">' +  media.descritpion + '</p>' +
            '<a href="#" class="btn btn-primary">Go somewhere</a>' +
            '</div>' + `<button type="button" id="remove` + i + `" class="btn-delete">delete</button>` +
            '</div>';

        if (localStorage.getItem('Collection') !== null) {
            tab = JSON.parse(localStorage.getItem('Collection'));
            tab.push(media);
            localStorage.setItem("Collection", JSON.stringify(tab));
        }else {
            collection.addMedia(media);
            console.log(collection.collection);
        }
    });


});

/////////////////////////////////////////////////////////////LocalStorageAffichage

    let data = localStorage.getItem("Collection");
    console.log(localStorage.getItem("Collection"));

    let dataParse = JSON.parse(data);
    let txt = "";
    let p = 0;
    dataParse.forEach((e) => {
        txt +=
            `<div class="card" "` +  e.title + `" style="width: 18rem;">` +
            '<img class="card-img-top" src="#" alt="Card image cap">' +
            '<div class="card-body">' +
            '<h5 class="card-title">' +  e.title + '</h5>' +
            '<p class="card-text">' +  e.releaseDate + '</p>' +
            '<p class="card-text">' +  e.descritpion + '</p>' +
            '<a href="#" class="btn btn-primary">Go somewhere</a>' +
            '</div>' + `<button type="button" id="remove` + i + `" class="btn-delete">delete</button>` +
            '</div>';
    });
    console.log(txt);
    document.getElementById("list").innerHTML = txt;

/////////////////////////////////////////////////////////////LocalStorageAffichage
document.addEventListener("click", function (e) {
    if (e.target.className === "btn-delete") {
        if (confirm("Voulez vous vraiment supprimer ce média ?") == true) {
            e.target.parentNode.remove();
        }
    }

});

document.addEventListener("click", function (e) {
    if (e.target.id === "All") {
        console.log("All");
        const card = document.querySelectorAll('.card');
        card.forEach(function (card) {
            card.style.display = "block";
        });
    }
    if (e.target.id === 'Album') {
        console.log("Album");
        const card = document.querySelectorAll('.card');
        card.forEach(function (card) {
            if (card.getAttribute('name') != 'Album') {
                card.style.display = "none";
            } else {
                card.style.display = "block";
            }
        });
    }
    if (e.target.id === 'Game') {
        const card = document.querySelectorAll('.card');
        card.forEach(function (card) {
            if (card.getAttribute('name') != 'Game') {
                card.style.display = "none";
            } else {
                card.style.display = "block";
            }
        });

    }
    if (e.target.id === 'Movie') {
        const card = document.querySelectorAll('.card');
        card.forEach(function (card) {
            if (card.getAttribute('name') != 'Movie') {
                card.style.display = "none";
            } else {
                card.style.display = "block";
            }
        });


    }
});


// Rating Initialization
$(document).ready(function () {
    $('#rateMe2').mdbRate();
});