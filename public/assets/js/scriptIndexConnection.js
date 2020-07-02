        var date = new Date();
        var month = date.getMonth() + 1;

        fetch("v1/events?limit=4&offset=0&month=" + month)
        .then(function(response) {
            if (!response.ok) 
                throw new Error("HTTP error, status = " + response.status);
            return response.json();
        })
        .then(function(json) {
            for (var i = 0; i < json.length; i++) {
                let {title, image, id_event} = json[i];

                document.getElementById("event_" + i).style.display = "block";
                document.getElementById("event_img_" + i).src = `${image}`;
                document.getElementById("event_desc_" + i).innerHTML =  `${title}`;
                document.getElementById("event_link_" + i).onclick = function() 
                    {localStorage["id_event"] = `${id_event}`;};
            }
        });

        fetch("v1/services?limit=4&offset=0")
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
        });