var figcaption = document.createElement('p');
figcaption.innerHTML = "Loading";
document.getElementById("loading-div").appendChild(figcaption);

var loading = document.createElement('img');
loading.src = '../assets/img/loading.png';
loading.classList.add('icn-spinner');
document.getElementById("loading-div").appendChild(loading);



fetch("../v1/services?limit=12&offset=0")
.then(function(response) {
if (!response.ok) 
    throw new Error("HTTP error, status = " + response.status);
return response.json();
})

.then(function(json) {
    for (var i = 0; i < json.length; i++) {
        let {title, photo, id_service} = json[i];

        document.getElementById("service_desc_" + i).innerHTML =  `${title}`;
        document.getElementById("service_" + i).style.display = "block";
        document.getElementById("service_img_" + i).src = `${photo}`;
        document.getElementById("service_link_" + i).onclick = function() 
            {localStorage["id_service"] = `${id_service}`;};
    }
    document.getElementById("loading-div").removeChild(figcaption);
    document.getElementById("loading-div").removeChild(loading);
})
;

