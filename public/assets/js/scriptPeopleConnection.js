var figcaption = document.createElement('p');
figcaption.innerHTML = "Loading";
document.getElementById("loading-div").appendChild(figcaption);

var loading = document.createElement('img');
loading.src = '../assets/img/loading.png';
loading.classList.add('icn-spinner');
document.getElementById("loading-div").appendChild(loading);

fetch("../v1/volunteers?limit=8&offset=0")
.then(function(response) {
if (!response.ok) 
    throw new Error("HTTP error, status = " + response.status);
return response.json();
})
.then(function(json) {
    //populate peoples
    for (var i = 0; i < json.length; i++) {
        let {fullname, photo, motto, id_person} = json[i];

        document.getElementById("person_" + i).style.display = "block";
        document.getElementById("person_name_" + i).innerHTML =  `${fullname}`;
        document.getElementById("person_img_" + i).src = `${photo}`;
        document.getElementById("person_motto_" + i).innerHTML =  `${motto}`;
        document.getElementById("person_" + i).onclick = function() 
            {localStorage["id_person"] = `${id_person}`;};
    }
    document.getElementById("loading-div").removeChild(figcaption);
    document.getElementById("loading-div").removeChild(loading);
});