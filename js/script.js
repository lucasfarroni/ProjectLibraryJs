
document.getElementById('btnAddMedia').addEventListener('click',function () {

    document.getElementById('form').style.display="block";

    document.getElementById('btnSubmit').addEventListener('click',function () {
        // i++;

        console.log("test");
        document.getElementById('form').style.display="none";
        name = document.getElementById('title').value;
        document.getElementById('containerList').innerHTML +=

            `<div class="card ` + i + ` " style="width: 18rem;">`+
            '<img class="card-img-top" src="#" alt="Card image cap">' +
            '<div class="card-body">' +
            '<h5 class="card-title">' + name + '</h5>' +
            '<p class="card-text">Some quick example text to build on the card title and make up the bulk of thecards content.</p>' +
            '<a href="#" class="btn btn-primary">Go somewhere</a>' +
            '</div>' + `<button type="button" id="remove` + i + `" class="btn btn-danger">delete</button>`+
            '</div>';
    });

});

let i = 0;
// Rating Initialization
$(document).ready(function() {
    $('#rateMe2').mdbRate();
});