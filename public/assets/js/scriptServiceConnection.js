fetch("../v1/services/"  + localStorage["id_service"])
.then(function(response) {
if (!response.ok) 
    throw new Error("HTTP error, status = " + response.status);
return response.json();
})
.then(function(json) {
    let {s_title, presentation, pratical_info} = json[0];

    document.getElementById("service_title").innerHTML = `${s_title}`;
    document.getElementById("breadcrumb").innerHTML = `${s_title}`;
    document.getElementById("service_presentation").innerHTML = `${presentation}`;
    document.getElementById("service_pratical_info").innerHTML = `${pratical_info}`;

    var id_events = [];
    var id_people = [];
    var id_service_photoes = [];
    for(var i = 0; i < json.length; i++){
        let{id_event, id_person, id_service_photo} = json[i];  
        if(! id_events.includes(`${id_event}`)){
            id_events.push(`${id_event}`)
        }
        if(! id_people.includes(`${id_person}`)){
            id_people.push(`${id_person}`)
        }
        if(! id_service_photoes.includes(`${id_service_photo}`)){
            id_service_photoes.push(`${id_service_photo}`)
        }
    }
    
    for (var i = 0; i < json.length; i++) {
        let {title, image, id_event, fullname, photo, motto, id_person, id_service_photo, sp_photo} = json[i];
        
        console.log("length" + json.length);
        console.log("count" + i);
        console.log(json[i]);
        //populate image carousel
        if(id_service_photoes.includes(`${id_service_photo}`)){

            var img = document.createElement('img'); 
            img.classList.add('carousel-item-img');
            img.src = `${sp_photo}`;
            document.getElementById("service-carousel").appendChild(img);
            id_service_photoes.splice(id_service_photoes.indexOf(`${id_service_photo}`), 1);
        }

        //populate people cards
        if(id_people.includes(`${id_person}`)){
            document.getElementById("person_fullname_" + i).innerHTML =  `${fullname}`;
            document.getElementById("person_motto_" + i).innerHTML =  `${motto}`;
            document.getElementById("person_" + i).style.display = "block";
            document.getElementById("person_img_" + i).src = `${photo}`;
            document.getElementById("person_" + i).onclick = function() 
                {localStorage["id_person"] = `${id_person}`;};
            id_people.splice(id_people.indexOf(`${id_person}`), 1);
        }

        //populate event cards
        if(id_events.includes(`${id_event}`)){
            console.log("id before" + id_events);
            var div1 = document.createElement('div');
            div1.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-4');
            div1.style.display = "block";
            document.getElementById("event-of-service").appendChild(div1);

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

            /*document.getElementById("event_" + i).style.display = "block";
            document.getElementById("event_desc_" + i).innerHTML =  `${title}`;
            document.getElementById("event_img_" + i).src = `${image}`;
            document.getElementById("event_link_" + i).onclick = function() 
                {localStorage["id_event"] = `${id_event}`;};*/
            id_events.splice(id_events.indexOf(`${id_event}`), 1);
        }

    }
    $(document).ready(function(){
        $('.carousel-containera').slick({
            autoplay: true,
            autoplaySpeed: 3000,
            dots: true,
            arrows: false
        });
    });
});