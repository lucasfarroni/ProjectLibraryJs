<<<<<<< HEAD
import {Collection} from "../Controller/Collection.js";
import {Media} from "../Controller/Media.js";

let collection = new Collection();

//collection.addMedia(media);
//console.log(collection.collection);




=======
>>>>>>> parent of f3e61bc (Merge branch 'master' into binome-2)
let i = 0;

document.getElementById('btnAddMedia').addEventListener('click', function () {

    document.getElementById('form').style.display = "block";

    document.getElementById('btnSubmit').addEventListener('click', function () {
        // i++;

<<<<<<< HEAD
        let media = new Media(document.getElementById('title').value, "releaseDate", "rating", "img");
=======
        console.log("test");
>>>>>>> parent of f3e61bc (Merge branch 'master' into binome-2)
        document.getElementById('form').style.display = "none";
        name = document.getElementById('title').value;
        document.getElementById('containerList').innerHTML +=

            `<div class="card" name ="` + name + `" style="width: 18rem;">` +
            '<img class="card-img-top" src="#" alt="Card image cap">' +
            '<div class="card-body">' +
<<<<<<< HEAD
            '<h5 class="card-title">' +  media.title + '</h5>' +
=======
            '<h5 class="card-title">' + name + '</h5>' +
>>>>>>> parent of f3e61bc (Merge branch 'master' into binome-2)
            '<p class="card-text">Some quick example text to build on the card title and make up the bulk of thecards content.</p>' +
            '<a href="#" class="btn btn-primary">Go somewhere</a>' +
            '</div>' + `<button type="button" id="remove` + i + `" class="btn-delete">delete</button>` +
            '</div>';
<<<<<<< HEAD

        collection.addMedia(media);
        console.log(collection.collection);
=======
>>>>>>> parent of f3e61bc (Merge branch 'master' into binome-2)
    });


});

<<<<<<< HEAD
/////////////////////////////////////////////////////////////LocalStorageAffichage
if (localStorage.getItem('Collection') !== null) {
    let data = localStorage.getItem("Collection");
    console.log(localStorage.getItem("Collection"));

    let dataParse = JSON.parse(data);
    let txt = "";
    let p = 0;
    dataParse.forEach((e) => {
        txt += '<li class="list-group-item">' + `${e.title} <br>` + '</li>'
    });
    console.log(txt);
    document.getElementById("list").innerHTML = txt;
<<<<<<< HEAD

=======
>>>>>>> parent of f3e61bc (Merge branch 'master' into binome-2)

document.getElementById('trie').addEventListener('click', function () {
    console.log("trie");
    const card = document.querySelectorAll('.card');
    console.log(card);
    const cardArray = Array.from(card);
    if (document.getElementById('trie').value == "nom") {
        console.log("trie par nom");
        let cardSortByName = cardArray.sort((a, b) => {
            const nameA = a.getAttribute("name");
            const nameB = b.getAttribute("name");
            console.log(nameA);
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        });

        let containerList = document.getElementById('containerList');

        deleteChild(containerList);


        for (i = 0; i < cardSortByName.length; i++) {
            console.log(cardSortByName[i].getAttribute("name"));
            containerList.append(cardSortByName[i]);
        }

    }


});


function deleteChild(element) {
    let e = element;

    //e.firstElementChild can be used.
    let child = e.lastElementChild;
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}


<<<<<<< HEAD

=======
}
>>>>>>> parent of 85ab4b0 (localStorage add ok)
/////////////////////////////////////////////////////////////LocalStorageAffichage

=======
>>>>>>> parent of f3e61bc (Merge branch 'master' into binome-2)
document.addEventListener("click", function (e) {
    if (e.target.className === "btn-delete") {
        if (confirm("Voulez vous vraiment supprimer ce média ?") == true) {
            e.target.parentNode.remove();
        }
    }

});

document.addEventListener("click", function (e) {
    if (e.target.id === "All") {
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