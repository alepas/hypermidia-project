const c = document.querySelector('.pagination')
const indexs = Array.from(document.querySelectorAll('.index'))
let cur = -1
indexs.forEach((index, i) => {
  index.addEventListener('click', (e) => {
    // clear
    c.className = 'pagination'
    void c.offsetWidth; // Reflow
    c.classList.add('open')
    c.classList.add(`i${i + 1}`)
    if (cur > i) {
      c.classList.add('flip')
    }
    cur = i
    //services pagination
    if(index.id.includes("service_index")){
      var offset = (index.innerHTML - 1) * 12;
      fetch("../../v1/services?limit=12&offset=" + offset)
      .then(function(response) {
      if (!response.ok) 
        throw new Error("HTTP error, status = " + response.status);
      return response.json();
      })

      .then(function(json) {
        for (var i = 0; i < 12; i++) {
          document.getElementById("service_" + i).style.display = "none";
        }
        for (var i = 0; i < json.length; i++) {
          let {title, photo, id_service} = json[i];

          document.getElementById("service_desc_" + i).innerHTML =  `${title}`;
          document.getElementById("service_" + i).style.display = "block";
          document.getElementById("service_img_" + i).src = `${photo}`;
          document.getElementById("service_link_" + i).onclick = function() 
              {localStorage["id_service"] = `${id_service}`;};
        }
      });
    //people pagination
    } else if(index.id.includes("person_index")){
      var offset = (index.innerHTML - 1) * 8;
      fetch("../../v1/volunteers?limit=8&offset=" + offset)
      .then(function(response) {
      if (!response.ok) 
          throw new Error("HTTP error, status = " + response.status);
      return response.json();
      })
      .then(function(json) {
        for (var i = 0; i < 8; i++) {
          document.getElementById("person_" + i).style.display = "none";
        }
          for (var i = 0; i < json.length; i++) {
              let {fullname, photo, motto, id_person} = json[i];

              document.getElementById("person_" + i).style.display = "block";
              document.getElementById("person_name_" + i).innerHTML =  `${fullname}`;
              document.getElementById("person_img_" + i).src = `${photo}`;
              document.getElementById("person_motto_" + i).innerHTML =  `${motto}`;
              document.getElementById("person_" + i).onclick = function() 
                  {localStorage["id_person"] = `${id_person}`;};
          }
      });
    //events pagination
    } else if(index.id.includes("all_event_index")){
      var offset = (index.innerHTML - 1) * 9;
      fetchEvents(offset)
    }
  })
})