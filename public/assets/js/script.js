var slideIndex = 1;
var slideNumber = 1;

$(document).ready(function(){
    $('.carousel-containera').slick({
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    arrows: false
    });
});
//hideSlides();

/*
// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}*/

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

//Sets the number of slides
function setSlides(n){
    slideNumber = n;
    showSlides(slideIndex);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("carousel-itema");
    var dots = document.getElementsByClassName("carousel-dot");
    if (n > slideNumber) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slideNumber
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for(i= slideNumber; i< slides.length; i++){
        dots[i].style.display = "none";
    }
    for (i = 0; i < slideNumber; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

function hideSlides(){
    var slides = document.getElementsByClassName("carousel-itema");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
}