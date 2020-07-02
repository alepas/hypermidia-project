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
      if(json.length == 0){
          document.getElementById("event_desc_0").innerHTML = "Oh no! Looks like there are still no events scheduled for this month";
          document.getElementById("event_desc_0").style.color = "black";
          document.getElementById("event_img_0").src = "../assets//img/cartoon_desert.jpg";
          document.getElementById("event_0").style.display = "block";
          document.getElementById("event_link_0").href = "javascript:function() { return false; }"
      }else{
          for (var i = 0; i < json.length; i++) {
              let {title, image, id_event} = json[i];
              document.getElementById("event_" + i).style.display = "block";
              document.getElementById("event_desc_" + i).style.color = "white";
              document.getElementById("event_desc_" + i).innerHTML =  `${title}`;
              document.getElementById("event_img_" + i).src = `${image}`;
              document.getElementById("event_link_0").href = "./Event.html"
              document.getElementById("event_link_" + i).onclick = function() 
                  {localStorage["id_event"] = `${id_event}`;};
          }
      }
  });
}