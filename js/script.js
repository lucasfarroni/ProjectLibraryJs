
document.getElementById('btnAddMedia').addEventListener('click',function () {

    document.getElementById('form').style.display="block";

    name = document.getElementById('lname').value;
    document.getElementById('containerList')[0].innerHTML =
        '<div class="card" style="width: 18rem;">' +
        '<img class="card-img-top" src="..." alt="Card image cap">' +
        '<div class="card-body">' +
        '<h5 class="card-title">' + name + '</h5>' +
        '<p class="card-text">Some quick example text to build on the card title and make up the bulk of thecards content.</p>' +
    '<a href="#" class="btn btn-primary">Go somewhere</a>' +
    '</div>' +
    '</div>'
});

