var topic;
var perios;

function filterEvents(offset){
    var radios = document.getElementsByClassName("form-check-input");

    for(var i=0; i< radios.length; i++){
        if(radios[i].checked){
            if(radios[i].name == "topicRadio")
                topic = radios[i].value;
            else
                period = radios[i].value;
        }
    }

    fetchEvents(offset)
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

function fetchEvents(offset){
    var fet = "../../v1/events?limit=10&offset=" + offset;
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
        if(json.length < 10 && offset < 9)
            document.getElementById("all_event_index_1").style.display = "none";
        for(var i=0; i<9; i++)
            document.getElementById("event_" + i).style.display = "none";

        for (var i = 0; i < json.length && i<9; i++) {
            let {title, image, id_event} = json[i];

            document.getElementById("event_" + i).style.display = "block";
            document.getElementById("event_desc_" + i).innerHTML =  `${title}`;
            document.getElementById("event_img_" + i).src = `${image}`;
            document.getElementById("event_link_" + i).onclick = function() 
                {localStorage["id_event"] = `${id_event}`;};
        }
    });
}