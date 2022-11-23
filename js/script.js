import {Collection} from "../Controller/Collection.js";
import {Media} from "../Controller/Media.js";

let collection = new Collection();
let tab = [];
//collection.addMedia(media);
//console.log(collection.collection);

/*function apiCall(movieTitle){

    let url = "http://img.omdbapi.com/?apikey=3ace04ab"+ movieTitle;
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => {

            let media = new Media(data.Title, data.Year, data.Poster, data.imdbID);
            console.log(media);

        })
        .catch(error => console.log(error));
}
let mediaTest = new Media("Matrix", "test", "test", "test");
apiCall(mediaTest.title);
console.log("ok appel api");*/

async function apiCall(movieTitle){
    let options = {
        method: 'GET'
    };

    return await fetch("http://omdbapi.com/?apikey=3ace04ab&t="+ movieTitle, options)
        .then(response =>{
            console.log(response);
            return response.json()
        })
        .then(data => {
           return data;
        })
        .catch(error => console.log(error));
}
apiCall("Matrix");
let i = 0;


document.getElementById('btnAddMedia').addEventListener('click', function () {

    document.getElementById('form').style.display = "block";

    document.getElementById('btnSubmit').addEventListener('click', function () {
        // i++;

        let media = new Media(document.getElementById('title').value, document.getElementById('date').value, "rating", "img",document.getElementById('subject').value);
        document.getElementById('form').style.display = "none";

        console.log(localStorage.getItem('Collection')=== null);
        if (localStorage.getItem('Collection')!== null ) {

            tab = JSON.parse(localStorage.getItem('Collection'));
            console.log(tab);
            let similar = media.title;
            let index = tab.findIndex((media) => media.title === similar);
            console.log(index);
            if (index === -1) {
                tab.push(media);
                localStorage.setItem('Collection', JSON.stringify(tab));
                console.log("already in");

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
            } else {
                alert("title exist in array modify the title for add this media");
            }

        }else  {
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

            console.log("test");
            collection.addMedia(media);

        }
    });


});

/////////////////////////////////////////////////////////////LocalStorageAffichage

    let data = localStorage.getItem("Collection");
    console.log(localStorage.getItem("Collection"));

    let dataParse = JSON.parse(data);
    let txt = "";

    dataParse.forEach((e) => {
        txt +=
            `<div class="card" "` +  e.title + `" style="width: 18rem;">` +
            '<img class="card-img-top" src="#" alt="Card image cap">' +
            '<div class="card-body">' +
            '<h5 class="card-title" id="titleOfMedia">' +  e.title + '</h5>' +
            '<p class="card-text">' +  e.releaseDate + '</p>' +
            '<p class="card-text">' +  e.descritpion + '</p>' +
            '<a href="#" class="btn btn-primary">Go somewhere</a>' +
            '</div>' + `<button type="button" id="remove` + i + `" class="btn-delete">delete</button>` +
            '</div>';
    });
    console.log(txt);
    document.getElementById("list").innerHTML = txt;


document.getElementById('trie').addEventListener('click', function () {
    console.log("trie");
    const card = document.querySelectorAll('.card');

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

