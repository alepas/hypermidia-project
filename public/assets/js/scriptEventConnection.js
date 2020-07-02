fetch("../v1/events/"  + localStorage["id_event"])
.then(function(response) {
if (!response.ok) 
    throw new Error("HTTP error, status = " + response.status);
return response.json();
})
.then(function(json) {
    let {title, image, date, start_time, end_time, place, description, fullname, photo, motto, id_person} = json[0];
    var time =   "From " + `${start_time}` + " to " +  `${end_time}`;
    var ev_date =  `${date}`;
    var date_array = ev_date.split("T");
    var date_nice = date_array[0].split("-").reverse();

    document.getElementById("event_title").innerHTML = `${title}`;
    document.getElementById("breadcrumb").innerHTML = `${title}`;
    document.getElementById("event_img").src = `${image}`;
    document.getElementById("event_img").style.display = "block";
    document.getElementById("event_date").innerHTML = date_nice[0] + "-" + date_nice[1] + "-" + date_nice[2];
    document.getElementById("event_time").innerHTML = time;
    document.getElementById("event_place").innerHTML = `${place}`;
    document.getElementById("event_description").innerHTML = `${description}`;

    document.getElementById("organizer_fullname").innerHTML =  `${fullname}`;
    document.getElementById("organizer_motto").innerHTML =  `${motto}`;
    document.getElementById("organizer").style.display = "block";
    document.getElementById("organizer_img").src = `${photo}`;
    document.getElementById("organizer").onclick = function() 
            {localStorage["id_person"] = `${id_person}`;};
    
    for (var i = 0; i < json.length; i++) {
        let {s_title, sp_photo, id_service} = json[i];

        document.getElementById("service_" + i).style.display = "block";
        document.getElementById("service_desc_" + i).innerHTML =  `${s_title}`;
        document.getElementById("service_img_" + i).src = `${sp_photo}`;
        document.getElementById("service_link_" + i).onclick = function() 
            {localStorage["id_service"] = `${id_service}`;};
    }
});