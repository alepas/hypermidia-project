fetch("../v1/volunteers/"  + localStorage["id_person"])
.then(function(response) {
if (!response.ok) 
    throw new Error("HTTP error, status = " + response.status);
return response.json();
})
.then(function(json) {
    let {fullname, photo, motto,email, number, description} = json[0];

    document.getElementById("person_fullname").innerHTML = `${fullname}`;
    document.getElementById("breadcrumb").innerHTML = `${fullname}`;
    document.getElementById("person_motto").innerHTML = `${motto}`;
    document.getElementById("person_number").innerHTML = `${number}`;
    document.getElementById("person_email").innerHTML = `${email}`;
    document.getElementById("person_description").innerHTML = `${description}`;
    document.getElementById("person_photo").src = `${photo}`;
    document.getElementById("person_photo").style.display = "block";

    var id_events = [];
    var id_services = [];
    for(var i = 0; i < json.length; i++){
        let{id_event, id_service} = json[i];
        if(! id_events.includes(`${id_event}`)){
            id_events.push(`${id_event}`)
        }
        if(! id_services.includes(`${id_service}`)){
            id_services.push(`${id_service}`)
        }
    }
    
    var flag_e = 1;
    var flag_s = 1;
    for (var i = 0; i < json.length; i++) {
        let {title, image, id_event,  id_service, s_title, sp_photo} = json[i];

        //populate event cards
        if(id_events.includes(`${id_event}`)){
            var div1 = document.createElement('div');
            div1.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-4');
            div1.style.display = "block";
           document.getElementById("event-of-person").appendChild(div1);

            var a = document.createElement('a');
            a.href = "./Event.html";
            a.onclick = function() {localStorage["id_event"] = `${id_event}`;};
            div1.appendChild(a);

            var div2 = document.createElement('div');
            div2.classList.add('card', 'bg-dark', 'text-white');
            a.appendChild(div2);

           var img = document.createElement('img');
            img.classList.add('card-img');
            img.src = `${image}`;
            div2.appendChild(img);

            var h2 = document.createElement('h2');
            h2.classList.add('card-img-overlay', 'flex-column', 'd-flex', 'justify-content-end');
            h2.innerHTML = `${title}`;
            div2.appendChild(h2);
            id_events.splice(id_events.indexOf(`${id_event}`), 1);
        }

        if(id_services.includes(`${id_service}`)){
            var div1 = document.createElement('div');
            div1.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-4');
            div1.style.display = "block";
           document.getElementById("service-of-person").appendChild(div1);

            var a = document.createElement('a');
            a.href = "./Event.html";
            a.onclick = function() {localStorage["id_event"] = `${id_service}`;};
            div1.appendChild(a);

            var div2 = document.createElement('div');
            div2.classList.add('card', 'bg-dark', 'text-white');
            a.appendChild(div2);

           var img = document.createElement('img');
            img.classList.add('card-img');
            img.src = `${sp_photo}`;
            div2.appendChild(img);

            var h2 = document.createElement('h2');
            h2.classList.add('card-img-overlay', 'flex-column', 'd-flex', 'justify-content-end');
            h2.innerHTML = `${s_title}`;
            div2.appendChild(h2);
            id_services.splice(id_services.indexOf(`${id_service}`), 1);

        }
        /*if(flag_s == 1 && `${id_service}` == "null"){
            document.getElementById("service_desc_" + i).innerHTML = "Oh no! " + `${fullname}` + " is not related to any service at the moment";
            document.getElementById("service_desc_" + i).style.color = "black";
            document.getElementById("service_" + i).style.display = "block";
            document.getElementById("service_link_" + i).href = "javascript:function() { return false; }"
            flag_s = 0;
        }else{
            if(flag_s == 1 && id_services.includes(`${id_service}`)){
                document.getElementById("service_desc_" + i).innerHTML =  `${s_title}`;
                document.getElementById("service_" + i).style.display = "block";
                document.getElementById("service_img_" + i).src = `${sp_photo}`;
                document.getElementById("service_link_" + i).onclick = function() 
                    {localStorage["id_service"] = `${id_service}`;};
                id_services.splice(id_services.indexOf(`${id_service}`), 1);
            }
        }
        
        //populate event cards
        if(flag_e == 1 && `${id_event}` == "null"){
            document.getElementById("event_" + i).style.display = "block";
            document.getElementById("event_desc_" + i).innerHTML = "Oh no! " + `${fullname}` + " is not the coordinator of any event at the moment";
            document.getElementById("event_desc_" + i).style.color = "black";
            document.getElementById("event_link_" + i).href = "javascript:function() { return false; }"
            flag_e = 0;
        }else {
            if(flag_e == 1 && id_events.includes(`${id_event}`)){
                document.getElementById("event_" + i).style.display = "block";
                document.getElementById("event_desc_" + i).innerHTML =  `${title}`;
                document.getElementById("event_img_" + i).src = `${image}`;
                document.getElementById("event_link_" + i).onclick = function() 
                    {localStorage["id_event"] = `${id_event}`;};
                id_events.splice(id_events.indexOf(`${id_event}`), 1);
            }
        }*/
    }
});