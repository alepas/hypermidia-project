function filterEvents(){
    var radios = document.getElementsByClassName("form-check-input");
    var topic;
    var period;

    for(var i=0; i< radios.length; i++){
        if(radios[i].checked){
            if(radios[i].name == "topicRadio")
                topic = radios[i].value;
            else
                period = radios[i].value;
        }
    }

    var fet = "../../v1/events?limit=9&offset=0";
    if(topic != null)
        fet = fet + "&" + "topic=" + topic;
    if(period != null)
        fet = fet + "&" + "period=" + period;

    fetch(fet)
    .then(function(response) {
    if (!response.ok) 
        throw new Error("HTTP error, status = " + response.status);
    return response.json();
    })
    .then(function(json) {
        for(var i=0; i<9; i++)
            document.getElementById("event_" + i).style.display = "none";

        for (var i = 0; i < json.length; i++) {
            let {title, image, id_event} = json[i];

            document.getElementById("event_" + i).style.display = "block";
            document.getElementById("event_desc_" + i).innerHTML =  `${title}`;
            document.getElementById("event_img_" + i).src = `${image}`;
            document.getElementById("event_link_" + i).onclick = function() 
                {localStorage["id_event"] = `${id_event}`;};
        }
    });
}

function clearFilters(){
    var radios = document.getElementsByClassName("form-check-input");

    for(var i=0; i< radios.length; i++){
        radios[i].checked = false;
    }

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
    });
}