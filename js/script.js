let i = 0;

document.getElementById('btnAddMedia').addEventListener('click', function () {

    document.getElementById('form').style.display = "block";

    document.getElementById('btnSubmit').addEventListener('click', function () {
        // i++;

        console.log("test");
        document.getElementById('form').style.display = "none";
        name = document.getElementById('title').value;
        document.getElementById('containerList').innerHTML +=

            `<div class="card" name ="` + name + `" style="width: 18rem;">` +
            '<img class="card-img-top" src="#" alt="Card image cap">' +
            '<div class="card-body">' +
            '<h5 class="card-title">' + name + '</h5>' +
            '<p class="card-text">Some quick example text to build on the card title and make up the bulk of thecards content.</p>' +
            '<a href="#" class="btn btn-primary">Go somewhere</a>' +
            '</div>' + `<button type="button" id="remove` + i + `" class="btn-delete">delete</button>` +
            '</div>';
    });


});


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