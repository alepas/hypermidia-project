function filterPeople(){
    for(var i=0; i<8; i++){
        document.getElementById("person_" + i).style.display = "none";
    }

    fetch("../v1/volunteers?limit=10&offset=0")
    .then(function(response) {
    if (!response.ok) 
        throw new Error("HTTP error, status = " + response.status);
    return response.json();
    })
    .then(function(json) {
        var count=0;
        var filter = document.getElementById("filter").value.toLowerCase();

        for(var i = 0; i < json.length; i++){
            let {fullname} = json[i];
            if(`${fullname}`.includes(filter))
                count++;
        }
        if(count <= 8)
            document.getElementById("all_event_index_1").style.display = "none";
        else
            document.getElementById("all_event_index_1").style.display = "inline-block";
        count=0;
        
        //populate peoples
        for (var i = 0; i < json.length && count<8; i++) {
            let {fullname, photo, motto, id_person} = json[i];
            if(`${fullname}`.includes(filter)){
                document.getElementById("person_" + count).style.display = "block";
                document.getElementById("person_name_" + count).innerHTML =  `${fullname}`;
                document.getElementById("person_img_" + count).src = `${photo}`;
                document.getElementById("person_motto_" + count).innerHTML =  `${motto}`;
                document.getElementById("person_" + count).onclick = function() 
                    {localStorage["id_person"] = `${id_person}`;};
                count++;
            }
        }
    });
}