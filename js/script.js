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
    //test

});


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