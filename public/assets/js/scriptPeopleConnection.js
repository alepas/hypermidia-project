fetch("../v1/volunteers?limit=8&offset=0")
.then(function(response) {
if (!response.ok) 
    throw new Error("HTTP error, status = " + response.status);
return response.json();
})
.then(function(json) {
    for (var i = 0; i < json.length; i++) {
        let {fullname, photo, motto, id_person} = json[i];

        document.getElementById("person_" + i).style.display = "block";
        document.getElementById("person_name_" + i).innerHTML =  `${fullname}`;
        document.getElementById("person_img_" + i).src = `${photo}`;
        document.getElementById("person_motto_" + i).innerHTML =  `${motto}`;
        document.getElementById("person_" + i).onclick = function() 
            {localStorage["id_person"] = `${id_person}`;};
        savePeople(`${fullname}`);
    }
});