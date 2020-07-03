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
        //count the number of people that respects the filter
        for(var i = 0; i < json.length; i++){
            let {fullname} = json[i];
            var name = `${fullname}`;
            var l_name = name.toLowerCase();
            if(l_name.includes(filter))
                count++;
        }
        if(count <= 8)
            document.getElementById("person_index_1").style.display = "none";
        else
            document.getElementById("person_index_1").style.display = "inline-block";
        count=0;

        //populate people
        for (var i = 0; i < json.length && count<8; i++) {
            let {fullname, photo, motto, id_person} = json[i];
            var name = `${fullname}`;
            var l_name = name.toLowerCase();
            if(l_name.includes(filter)){
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