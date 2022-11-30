let StarsActive = '<i class="rating__star fas fa-star"></i>';

let StarsUnactive = '<i class="rating__star far fa-star"></i>';


export function ratingStars(rating) {

    console.log(rating);
    let ratingStars = rating / 2;
    if (ratingStars >= 5) {
        //document.getElementById("ratingId").innerHTML =
        return  StarsActive + StarsActive + StarsActive + StarsActive + StarsActive;
    } else if (ratingStars >= 4) {
       // document.getElementById("ratingId").innerHTML =
        return  StarsActive + StarsActive + StarsActive + StarsActive + StarsUnactive;
    } else if (ratingStars >= 3) {
       // document.getElementById("ratingId").innerHTML =
        return  StarsActive + StarsActive + StarsActive + StarsUnactive + StarsUnactive;
    } else if (ratingStars >= 2) {
        //document.getElementById("ratingId").innerHTML =
        return  StarsActive + StarsActive + StarsUnactive + StarsUnactive + StarsUnactive;
    } else {
        //document.getElementById("ratingId").innerHTML =
           return StarsActive + StarsUnactive + StarsUnactive + StarsUnactive + StarsUnactive;
    }

}