var figcaption = document.createElement('p');
figcaption.innerHTML = "Loading";
figcaption.style.marginTop = '5vh';
document.getElementById("loading-div").appendChild(figcaption);

var loading = document.createElement('img');
loading.src = '../assets/img/loading.png';
loading.classList.add('icn-spinner');
document.getElementById("loading-div").appendChild(loading);

fetch("../v1/events?limit=9&offset=0")
.then(function(response) {
if (!response.ok) 
    throw new Error("HTTP error, status = " + response.status);
return response.json();
})
.then(function(json) {
    for (var i = 0; i < json.length; i++) {
        let {title, image, id_event} = json[i];

        document.getElementById("event_" + i).style.display = "block";
        document.getElementById("event_desc_" + i).innerHTML =  `${title}`;
        document.getElementById("event_img_" + i).src = `${image}`;
        document.getElementById("event_link_" + i).onclick = function() 
            {localStorage["id_event"] = `${id_event}`;};
    }
    document.getElementById("loading-div").removeChild(figcaption);
    document.getElementById("loading-div").removeChild(loading);
});