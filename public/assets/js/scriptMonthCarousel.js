var today = new Date();
var slideIndex = today.getMonth() +1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("month-itema");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

    slides[slideIndex-1].style.display = "block";

    changeMonth(slideIndex);
}

function changeMonth(month){
  fetch("../../v1/events?limit=12&offset=0&month=" + month)
  .then(function(response) {
      if (!response.ok) 
      throw new Error("HTTP error, status = " + response.status);
      return response.json();
  })
  .then(function(json) {
      for(var i=0; i<12; i++)
        document.getElementById("event_" + i).style.display = "none";
      for (var i = 0; i < json.length; i++) {
          var event_desc = document.getElementById("event_desc_" + i);
          let {title, image, id_event, date} = json[i];

          document.getElementById("event_" + i).style.display = "block";
          document.getElementById("event_img_" + i).src = `${image}`;
      //  document.getElementById("event_img_" + i).style.height = "300";
          event_desc.innerHTML =  `${title}`;
      }
  });
}